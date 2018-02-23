import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../auth.service";
import { User } from "../../../user";
import { AdminService } from "../../admin.service";
import { agencySummary } from "../../model/agencySummary";
import { Align } from "@progress/kendo-angular-popup";

@Component({
    selector: "user-edit",
    templateUrl: "app/admin/manage-user/user-edit/user-create.component.html",
    providers: [AdminService, AuthService],
    styleUrls: ["app/admin/manage-user/user-edit/user-create.component.css"]
})    
export class UserCreateComponent {
    title: string = "Create User Account";
    userForm: FormGroup = null;
    errorMessage = null;
    text: string = "District";
    districts: Array<agencySummary> = [];
    show: boolean = false;
    anchorAlign: Align = { horizontal: "left", vertical: "top" };
    popupAlign: Align = { horizontal: "left", vertical: "bottom" };
    agencyCode: number;
    selectedAgencies: Array<agencySummary> = [];

    constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private adminService: AdminService) {
        
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }

        this.adminService
            .getAgenciesCCTS()
            .subscribe(result => {
                this.districts = result;                
            });

    }

    ngOnInit() {
        this.userForm = this.fb.group(
            {
                email: [
                    "", [
                        Validators.required,
                        Validators.pattern(
                            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9-](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                    ]
                ],
                password: ['', null],                
                passwordConfirm: ["", null],
                firstName: [
                    "", [
                        Validators.required,
                        Validators.maxLength(100)
                    ]
                ],
                lastName: [
                    "", [
                        Validators.required,
                        Validators.maxLength(100)
                    ]
                ],
                district: ["", null],
                school: ["", null],
                roles: this.fb.group({
                    Administrator: [null, ""],
                    State: [null, ""],
                    DistrictAdmin: [null, ""],
                    psaddsurveys: [null, ""],
                    pssubmitverification: [null, ""],
                    psviewreports: [null, ""]
                })                
            }
        );    
    }

    onSubmit() {
        let id = this.districts.find(i => i.agencyName = this.userForm.controls['district'].value).agencyCode;
        let counter = 0;
        let roles = new Array<string>();
        let element = <HTMLInputElement>document.getElementById("Administrator");
        if (element.checked) {
            roles[counter] = "Administrators";
            counter++;
        }
        element = <HTMLInputElement>document.getElementById("State")
        if (element.checked) {
            roles[counter] = "State";
            counter++;
        }
        element = <HTMLInputElement>document.getElementById("DistrictAdmin")
        if (element.checked) {
            roles[counter] = "DistrictAdmin";
            counter++;
        }
        element = <HTMLInputElement>document.getElementById("psaddsurveys")
        if (element.checked) {
            roles[counter] = "psaddsurveys";
            counter++;
        }
        element = <HTMLInputElement>document.getElementById("pssubmitverification")
        if (element.checked) {
            roles[counter] = "pssubmitverification";
            counter++;
        }
        element = <HTMLInputElement>document.getElementById("psviewreports")
        if (element.checked) {
            roles[counter] = "psviewreports";
            counter++;
        }
        if (roles.length == 0) {
            roles[0] = "None";
        }
        let message = {
            UserName: this.userForm.controls['email'].value,
            password: '',
            passwordConfirm: '',
            FName: this.userForm.controls['firstName'].value,
            LName: this.userForm.controls['lastName'].value,
            District: this.userForm.controls['district'].value,
            Email: this.userForm.controls['email'].value,
            DisplayName: this.userForm.controls['firstName'].value + ' ' + this.userForm.controls['lastName'].value,
            DistrictId: id,
            School: this.userForm.controls['school'].value,
            SchoolId: "",
            Roles: roles,
            Agencies: this.selectedAgencies
        };

        this.authService.add(message)
                .subscribe((data) => {
                        if (data.error == null) {
                            this.errorMessage = null;
                            window.alert("User creation succeeded.");
                            this.router.navigate(['/user-list']);                            
                        } else {
                            window.alert("User creation failed.");
                            this.errorMessage = data.error;
                        }
                    },
                    (err) => {
                        this.errorMessage = err;
                    });        
    } 

    cancel() {
        this.router.navigate(['/home']);
    }

    onToggle() {
        this.show = !this.show;
    }

    firstDropDownChanged(value: any) {            
        let dist = this.districts.find(i => i.agencyName == value);
        this.agencyCode = dist.id;
    }

    onSelectAddDistrict() {
        let distName = this.userForm.controls['district'].value;
        let exists = this.selectedAgencies.find(o => o.agencyName == distName);
        if (distName !== null && distName !== "" && exists == null) {
            let districtedSelected = this.districts.find(i => i.agencyName == distName);
            let count = this.selectedAgencies.length;
            this.selectedAgencies[count] = districtedSelected; 
        }                   
    }

    addSchool() {
        let schoolName = this.userForm.controls['school'].value;
        let exists = this.selectedAgencies.find(o => o.agencyName == schoolName);
        if (schoolName !== null && schoolName !== "" && exists == null) {
            let count = this.selectedAgencies.length;
            let schoolSelected = this.districts.find(i => i.agencyName == schoolName);
            this.selectedAgencies[count] = schoolSelected;
        }        
    }

    deleteSelected(id: number) {
        let dist = this.selectedAgencies.find(i => i.id == id);
        let index = this.selectedAgencies.indexOf(dist);
        this.selectedAgencies.splice(index, 1);
    }
}
import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { agencySummary } from "../../model/agencySummary";
import { AdminService } from "../../admin.service";
import { AuthService } from "../../../auth.service";

@Component({
    templateUrl: "/app/admin/manage-agency/add-district/add-district.component.html",
    selector: "add-dsitrict",
    providers: [AdminService, AuthService],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["app/admin/manage-agency/add-district/add-district.component.css"]
})
export class AddDistrictComponent {
    title: string = "Add New District Agency";
    isActive: boolean;
    start: Date; 
    end: Date; 
    model: agencySummary = new agencySummary(1, +"", "", "", "", " ", " ", " ", " ", " ", this.isActive, " ", this.start, this.end, " ", " ");

    
    //array to store id and name for esd dropdown menu
    esds = [
        { id: '20', name: 'ESD 101' },
        { id: '22', name: 'ESD 105' },
        { id: '14', name: 'ESD 112' },
        { id: '17', name: 'ESD 113' },
        { id: '16', name: 'ESD 114' },
        { id: '15', name: 'ESD 121' },
        { id: '21', name: 'ESD 123' },
        { id: '13', name: 'ESD 171' },
        { id: '18', name: 'ESD 189' },
    ]

   
    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router, private authService: AuthService) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
        this.isActive = true; 
    }

    ngOnInit() {

    } 

    //cancel button navigates back to manage-agency-districts 
    cancel() {
        this.router.navigate(["/manage-agency-districts"]);
    }

    //submit button calls addDistrict in adminService to add a agency into database
    submit() {
        //set model.isActive  
        this.model.isActive = this.isActive; 

        //
        this.adminService.addDistrict(this.model).subscribe(res => window.alert("District add succeeded."),
            error => window.alert("Target add failed."), () => this.router.navigate(["/manage-agency-districts"]));

    }


}
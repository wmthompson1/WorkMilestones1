import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { agencySummary } from "../../model/agencySummary";
import { AdminService } from "../../admin.service";
import { UpdateDistrict } from "../../model/updateDistrict"; 

@Component({
    templateUrl: "/app/admin/manage-agency/edit-agency/edit-agency.component.html",
    selector: "edit-agency",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["app/admin/manage-agency/edit-agency/edit-agency.component.html"],
    providers: [AdminService]
})
export class EditAgencyComponent {
    title: string = "Edit District";

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
    
    model: UpdateDistrict; 
    pId: string; 
    isActive: boolean;
    start: Date;
    end: Date; 
    
    //instantiate the model by assigning values being passed from previous page through snapshot.params
    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {

        this.model = {
            id: this.route.snapshot.params["id"],
            agencyCode: this.route.snapshot.params["agencyCode"],
            agencyName: this.route.snapshot.params["agencyName"],
            countyName: this.route.snapshot.params["countyName"],
            isActive: this.route.snapshot.params["isActive"],
            parentId: this.route.snapshot.params["parentId"],
        };

        
        this.pId = String(this.model.parentId); 
        
    }

    ngOnInit() {
         
       
    }

    //navigates to manage-agency-districts component
    cancel() {
        this.router.navigate(["/manage-agency-districts"]);
    }

    //calles adminService.updateDistrict to update the chosen agency
    submit() {

        //extract parentId's value
        var selected = <HTMLSelectElement>document.getElementById("parentId");
        var userInput = selected.value;

        //convert string userInput to number and assign it in model.parentId
        this.model.parentId = parseInt(userInput);


        // calls adminSrvice.updateDistrict with model as its parameter 
        this.adminService.updateDistrict(this.model)
            .subscribe(res => window.alert("District edit succeeded."),
                error => window.alert("District edit failed."),
                () => this.router.navigate(["/manage-agency-districts"])
                );

    }
}
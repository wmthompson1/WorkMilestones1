import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../admin.service";
import { agencySummary } from "../model/agencySummary";


@Component({
    selector: "/manage-agency-districts",
    templateUrl: "app/admin/manage-agency/manage-agency-districts.component.html",
    styleUrls: ["app/admin/manage-agency/manage-agency-districts.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class ManageAgency implements OnInit {

    districts: Array<agencySummary> = [] as Array<agencySummary>;
    AgencyName: string;
    leaverYear: string;
    progressValue: string;
    email: string = "stanleyd@seattleu.edu";
    agencyId: string;
    
    
    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
        this.AgencyName = "CCTS";
        
    }

    //renders district/agency list from database and displays them on front-end UI 
    ngOnInit() {
 
        this.adminService.getDistricts().subscribe(result => this.districts = result);

    }

    //navigates to add-district component to add agency to the list  
    addDistrict() {
        this.router.navigate(["/add-district"]);
    }

    //navigates to edit-agency component to edit agency relation infromation 
    editAgency(district: agencySummary) {

        this.router.navigate(["/edit-agency", district.id, district.agencyCode, district.agencyName, district.countyName, district.isActive, district.parentId]);
        
    }

    //Removes agency from agency list - removes a row from both database and model
    deleteAgency(district: agencySummary) {


        var index = this.districts.indexOf(district);
        this.adminService.deleteDistrict(district.id)
            .subscribe(res =>
                window.alert("District delete succeeded."),
            error => window.alert("District delete failed."),
        );
        this.districts.splice(index, 1);
        


        
    }

    
} 
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../admin/admin.service";
import { ISurveyBase } from "../surveys/model/surveyBase";
//import { PsService } from "../Post-School/ps.service";
//import { DistrictSummary } from "./DistrictSummary";
//import { ReportsService } from "../reports/reports.service";

/**************************************************************************************
Name:  manage-surveyFormEdit 

purpose: edit surveys

					DATE		COMMENT
--------------------------------------------
William Thompson	03/20/2018	Created. 

**************************************************************************************/

@Component({
    selector: "manage-surveyEditForm",
    templateUrl: "../surveys/manage-surveyBaseEdit.component.html",
    styleUrls: ["../surveys/manage-surveyBaseEdit.component.css"],

    
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class SurveyBaseEditComponent implements OnInit {


    model: any = {};
    loading = false;
    surveys: ISurveyBase[] = [];
    errorMessage: string;
    id: number;

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
        this.id = this.route.snapshot.params['id'];
        this.getSurvey(this.id);
    }


    ngOnInit()  {

    }

    getSurvey(id: number) {
        this.adminService.getSurveyBaseById(id)
            .subscribe(model => {
                this.model = model;

            },
            error => this.errorMessage = <any>error);

    }

    editExisting() {
        this.loading = true;
        //console.log("copy from ", this.model.DataItem.copyFromId)
        this.adminService.surveyBaseCreate(this.model)
            .subscribe(
            data => {
                this.router.navigate(['/surveyBase']);
            },
            error => {
                this.loading = false;
            });
    }

}



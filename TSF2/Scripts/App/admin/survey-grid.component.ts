import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { AdminService } from "../admin/admin.service";
import { ISurvey } from "../admin/survey"
import { NgForm } from '@angular/forms'

import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Rx';
import { animate } from '@angular/animations';

/**************************************************************************************
name:
purpose:

					DATE		COMMENT
--------------------------------------------
William Thompson	01/10/2018	Created. Based on/copied from existing district list objects. 

**************************************************************************************/

@Component({
    selector: "survey-render",  
    templateUrl: "app/admin/survey-grid.component.html",
    styleUrls: ["App/admin/survey-grid.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class SurveyGridComponent implements OnInit {

    title: string = "Manage Surveys";
    model: any = {};
    loading = false;
    surveys: ISurvey[] = [];
    errorMessage: string;
    message: ISurvey[] = [];
    
    public gridData: GridDataResult;
    skip: number = 0;
    take: number = 20;

    private state: State = {
        skip: 0,
        take: 5
    };

    constructor(private route: ActivatedRoute, private adminService: AdminService
        , private router: Router) {

    }
    
    ngOnInit(): void {
        this.getSurveys();
    }

    getSurveys() {
        this.adminService.surveyGetAll()
            .subscribe(surveys => {
                this.gridData = surveys;
            },
            error => this.errorMessage = <any>error);
    }

    //editExisting (value) {

    //    this.model = value;
    //    this.router.navigate(['/surveyFormEdit/', this.model.dataItem.id]);

    //}

    //addExisting(value) {

    //    this.model = value;
    //    //this.router.navigate(['/surveyFormEdit/', this.model.dataItem.id]);
    //    this.router.navigate(['/surveyDetails/', this.model.dataItem.id]);
    
    //}

    addExisting(value) {

        this.model = value;

        let message = {
            id: this.model.dataItem.id,
            name: this.model.dataItem.name,
            description: this.model.dataItem.description,
            surveyTypeCode: this.model.dataItem.surveyTypeCode,
            instructions: this.model.dataItem.instructions,

            isLocked: this.model.dataItem.isLocked,
            closeDate: this.model.dataItem.closeDate,
            createDate: this.model.dataItem.createDate,
            createdBy: this.model.dataItem.createdBy,
            updateDate: this.model.dataItem.updateDate,

            updatedBy: this.model.dataItem.updatedBy,
            schoolYear: this.model.dataItem.schoolYear,
            leaverYear: this.model.dataItem.LeaverYear,
            isReported: this.model.dataItem.isReported,
            openDate: this.model.dataItem.openDate
            };

        this.adminService.surveyDetailCreate(message)
            .subscribe(surveys => {
                this.surveys = surveys;

            },
            error => this.errorMessage = <any>error);

        this.router.navigate(['/surveyDetails/', this.model.dataItem.id]);

    }

    

} //class
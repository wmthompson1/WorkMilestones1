import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "../admin/admin.service";
import { ISurvey } from "../admin/survey"
import { NgForm } from '@angular/forms'

import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';
import { GroupDescriptor, DataResult, GroupResult } from '@progress/kendo-data-query';

import { Observable } from 'rxjs/Rx';
import { animate } from '@angular/animations';

import { ISurveyQuestionDetail } from '../surveys/model/surveyQuestionDetail'

/**************************************************************************************
name:
purpose:

					DATE		COMMENT
--------------------------------------------
William Thompson	01/10/2018	Created. Based on/copied from existing district list objects.
William Thompson    02/15/2018  post for surveyQuestionDetail
**************************************************************************************/

@Component({
    selector: "survey-render",
  
    templateUrl: '../admin/survey-grid.component.html',
    styleUrls: ["../admin/survey-grid.component.css"],
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
    surveyQuestionDetails: ISurveyQuestionDetail[] = [];
    
    public gridData: GridDataResult;
    skip: number = 0;
    take: number = 20;

    public groups: GroupDescriptor[] = [{ field: 'surveys.name' }];

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

    editExisting (value) {

    }

    addExisting(value) {

        //breaking change - I switched this to open surveyQuestions with Id instead of surveyId
            this.model = value;
            
           let thisid: number = this.model.dataItem.id;
           console.log("component parm:: ", thisid)  
           // this.router.navigate(['/surveyDetails/', this.model.dataItem.id]);
           // console.log("survey detail component parm:: ", this.model.dataItem.surveyId)
            this.router.navigate(['/surveyDetails/', thisid]);
    
        }


} //class 
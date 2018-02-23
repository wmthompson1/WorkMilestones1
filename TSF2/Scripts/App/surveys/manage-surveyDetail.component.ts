import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { AdminService } from "../admin/admin.service";
import { ISurveyQuestionDetail } from "../surveys/model/surveyQuestionDetail"
import { NgForm } from '@angular/forms'

import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';
import { GroupDescriptor, DataResult } from '@progress/kendo-data-query';
import { GroupResult } from '@progress/kendo-data-query';

import { Observable } from 'rxjs/Rx';
import { animate } from '@angular/animations';


/**************************************************************************************
name:
purpose:

					DATE		COMMENT
--------------------------------------------
William Thompson	02/13/2018	Created. Based on/copied from existing district list objects.

**************************************************************************************/

@Component({
    selector: "survey-detail",
  
    templateUrl: 'App/surveys/manage-surveyDetail.component.html',
    styleUrls: ["App/surveys/manage-surveyDetail.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class SurveyDetailComponent implements OnInit {

    title: string = "Manage Survey Details";
    model: any = {};
    loading = false;
    surveyDetails: ISurveyQuestionDetail[] = [];
    errorMessage: string;
    id: number;

    public gridData: GridDataResult;
    skip: number = 0;
    take: number = 20;

    public groups: GroupDescriptor[] = [{ field: 'name' }];

    private state: State = {
        skip: 0,
        take: 5
    };


    constructor(private route: ActivatedRoute, private adminService: AdminService
        , private router: Router) {
            this.id = this.route.snapshot.params['id'];
              
            this.GetRendering(this.id)
    }
    
    ngOnInit(): void {

    }

    GetRendering(id: number) {
        this.adminService.surveyDetailGetById(id)
            .subscribe(surveyQuestionDetails => {
                this.gridData = surveyQuestionDetails;
                
            },
            error => this.errorMessage = <any>error);
    }

   

} //class 
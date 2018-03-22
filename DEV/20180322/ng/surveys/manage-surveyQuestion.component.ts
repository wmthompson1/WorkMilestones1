import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// Kendo
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AdminService } from "../admin/admin.service";
import { ISurveyQuestion } from "../surveys/model/surveyQuestion";


/**************************************************************************************
Name: 
manage-survey.component.ts




					DATE		COMMENT
--------------------------------------------
William Thompson	03/08/2018	Created.

**************************************************************************************/

@Component({
    selector: "home",
    templateUrl: "../surveys/manage-surveyQuestion.component.html",
    styleUrls: ["../surveys/manage-surveyQuestion.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class SurveyQuestionComponent implements OnInit {

    title: string = "Manage Survey Questions";
    surveyQuestion: Array<ISurveyQuestion> = [] as Array<ISurveyQuestion>;

    id: number;
    errorMessage: string;
    model: any = {};

    public gridData: GridDataResult;
    skip: number = 0;
    take: number = 20;

    private type: 'numeric' | 'input' = 'numeric';
    private pageSizes: boolean = true;
    private previousNext: boolean = true;
    private info: boolean = true;
    private pageSize: number = 10;
    public sort: SortDescriptor[] = [];
    public unSort: boolean = true;
    public multiple: boolean = false;
    public editDataItem: ISurveyQuestion;
    public isNew: boolean;

    private state: State = {
        skip: 0,
        take: 5
    };

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
        this.id = this.route.snapshot.params['id'];
        console.log("Received parm: ", this.id )
        //this.getData();
    }


    // getData(): void {
    //     this.adminService
    //         .getSurveyQuestion(this.id)
    //         .subscribe(result => {
    //             this.surveyQuestion = result;
    //         },
    //         error => this.errorMessage = <any>error);
    // }



    ngOnInit() {
        this.route.data
            .subscribe((data: { surveyQuestion: ISurveyQuestion[] }) => {
                this.surveyQuestion = data.surveyQuestion;
            });
     //   this.loadItems();

    }

    // private loadItems(): void {
    //     this.gridData = {
    //         data: orderBy(this.surveyQuestion.slice(this.state.skip, this.state.skip + this.pageSize), this.sort),
    //         total: this.surveyQuestion.length
    //     };          
    // } // loadItems
    
}


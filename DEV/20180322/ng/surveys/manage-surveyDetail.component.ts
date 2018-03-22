// C:\thompson\src\repos\seed6 - Kendo\src\app\App\surveys\manage-surveyDetail.component.ts
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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
William Thompson    03/14/2018  Implemented resolver and async improvements

**************************************************************************************/

@Component({
    selector: "survey-detail",
  
    templateUrl: '../surveys/manage-surveyDetail.component.html',
    styleUrls: ["../surveys/manage-surveyDetail.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class SurveyDetailComponent implements OnInit {

    title: string = "Manage Survey Details";
    gridData: GridDataResult;

    skip: number = 0;
    take: number = 20;

    tabText: string = "Manage Survey Detail";
    tabColor: string = "default-tab";
    breadCrumLink: string = "Manage Survey Details";

    model: any = {};
    loading = false;
    //surveyQuestionDetail: ISurveyQuestionDetail[] = [];
    surveyQuestionDetail: Array<ISurveyQuestionDetail> = [] as Array<ISurveyQuestionDetail>;
    errorMessage: string;
    id: number;

    public groups: GroupDescriptor[] = [{ field: 'name' }];

    private state: State = {
        skip: 0,
        take: 5
    };

    private type: 'numeric' | 'input' = 'numeric';
    private pageSizes: boolean = true;
    private previousNext: boolean = true;
    private info: boolean = true;
    private pageSize: number = 5;
    public sort: SortDescriptor[] = [];
    public unSort: boolean = true;
    public multiple: boolean = false;
    public editDataItem: ISurveyQuestionDetail;
    public isNew: boolean;

    constructor(private route: ActivatedRoute, private adminService: AdminService
        , private router: Router) {
            this.id = this.route.snapshot.params['id'];
            console.log("Detail Component Received parm: ", this.id );
              
   
    }
    
    ngOnInit(): void {
        //ver 1
        //this.GetRendering(this.id)

        this.route.data
        .subscribe((data: { something: ISurveyQuestionDetail[] }) => {
            this.surveyQuestionDetail = data.something;
        });
        this.loadItems();

    }

    @ViewChild(GridComponent) private grid: GridComponent;

    sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadItems();
    }

    private loadItems(): void {
        console.log("debug area 100: ", this.surveyQuestionDetail.length)
        this.gridData = {
            data: orderBy(this.surveyQuestionDetail.slice(this.state.skip, this.state.skip + this.pageSize), this.sort),
            total: 1
        };    
        console.log("debug area 105: ", this.gridData.data.slice(0,1))      
    } // loadItems

    pageChange({ skip, take }: PageChangeEvent): void {
        this.state.skip = skip;
        this.pageSize = take;
        this.loadItems();
    }

    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.surveyQuestionDetail, this.state);
    }

    // addHandler(): void {
    //     this.router.navigate(["/xxxxx"]);
    // }

    // saveHandler(userListItem: User) {
    //     //this.authService.save(userListItem, this.isNew);
    //     //this.editDataItem = undefined;
    // }

    // removeHandler({ dataItem }) {
    //     var index = this.userList.indexOf(dataItem);
    //     this.authService.remove(dataItem.id).subscribe(() => { });
    //     this.userList.splice(index, 1);
    //     this.loadItems();
    // }

    addExisting(value) {

        this.model = value;
        console.log("survey detail component parm:: ", this.model.dataItem.surveyId)
        this.router.navigate(['/surveyQuestions/', this.model.dataItem.surveyId]);

    }

   

} //class 
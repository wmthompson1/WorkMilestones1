import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// Kendo
import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor, orderBy, State, process } from '@progress/kendo-data-query';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AdminService } from "../admin/admin.service";
import { ISurveyBase } from "../surveys/model/surveyBase";


/**************************************************************************************
Name: 
manage-survey.component.ts




					DATE		COMMENT
--------------------------------------------
William Thompson	03/08/2018	Created.

**************************************************************************************/

@Component({
    selector: "surveyBase",
    templateUrl: "../surveys/manage-surveyBase.component.html",
    styleUrls: ["../surveys/manage-surveyBase.component.css"],
    providers: [AdminService],
    encapsulation: ViewEncapsulation.None
})
export class SurveyBaseComponent implements OnInit {

  
    surveyBase: Array<ISurveyBase> = [] as Array<ISurveyBase>;

    id: number;
    errorMessage: string;
    model: any = {};


    // public gridData: GridDataResult;
    // skip: number = 0;
    // take: number = 20;

    // private type: 'numeric' | 'input' = 'numeric';
    // private pageSizes: boolean = true;
    // private previousNext: boolean = true;
    // private info: boolean = true;
    // private pageSize: number = 10;
    // public sort: SortDescriptor[] = [];
    // public unSort: boolean = true;
    // public multiple: boolean = false;
    // public editDataItem: ISurveyBase;
    // public isNew: boolean;

    // private state: State = {
    //     skip: 0,
    //     take: 5
    // };

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
        //this.id = this.route.snapshot.params['id'];
        console.log("SurveyBase form. ")
   
    }



    ngOnInit() {
        this.getData();
    
        } // ngOnInit

        getData()  {
            this.adminService.getSurveyBase()
                .subscribe(result => {
                    this.surveyBase = result;
                },
                error => this.errorMessage = <any>error);
                console.log("test")
        }
       

        // getSurveys() {
        //     this.adminService.surveyGetAll()
        //         .subscribe(surveys => {
        //             this.gridData = surveys;
        //         },
        //         error => this.errorMessage = <any>error);
        // }

    // ngOnInit() {
    //     this.route.data
    //         .subscribe((data: { surveyBase: ISurveyBase[] }) => {
    //             this.surveyBase = data.surveyBase;
    //         });
    //     this.loadItems();

    // } // ngOnInit

    // private loadItems(): void {
    //     this.gridData = {
    //         data: orderBy(this.surveyBase.slice(this.state.skip, this.state.skip + this.pageSize), this.sort),
    //         total: this.surveyBase.length
    //     };          
    // } // loadItems
    
}


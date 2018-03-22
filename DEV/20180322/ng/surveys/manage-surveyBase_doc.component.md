survey questions and answers/options doc
C:\thompson\src\repos\seed6 - Kendo\src\app\App\surveys\manage-surveyCopy_doc.component.md

* SurveyBaseComponent *

_ http://localhost:59999/api/admin/surveyBase/1 _  

#related 
// Surveys
import { ManageSurveyFormEditComponent } from "./admin/manage-surveyFormEdit.component";
import { SurveyGridComponent } from "./admin/survey-grid.component";
import { PopupModule } from "@progress/kendo-angular-popup";
import { SurveyDetailComponent } from "./surveys/manage-surveyDetail.component"	
import { Data } from "./admin/data";
import { SurveyBaseComponent } from "./surveys/manage-surveyBase.component"	


# Note 
created in ng Cli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

# Component Template
*SurveyBaseComponent*
*SurveyBaseEditComponent*

# Summary
	Step 1 - get Id by posting in a leaver year -- > baseEdit -- > usp_SurveyTransaction

	Step 2 - add new via update put (via the entity) for the detail post (which requires copy-from-id, LeaverYear
    , and NextId for dependency - > Test.usp_SurveyDetail_Add

	Step 3 - Final edit for the entire new survey in survey table (school year, etc.)

## Code scaffolding

_folder_ manage-surveys:

manage-surveyBase.component.css
manage-surveyBase.component.html
manage-surveyBase.component.ts

manage-surveyBaseEdit.component.css
manage-surveyBaseEdit.component.html
manage-surveyBaseEdit.component.ts

manage-surveyBaseAdd.component.css
manage-surveyBaseAdd.component.html
manage-surveyBaseAdd.component.ts


## Component Structure

_@Component_    
   1. selector: "survey-question",


    1. selector: "survey-question",  
    2. templateUrl: "App/surveys/manage-surveyBase.component.html",
    3. styleUrls: ["App/surveys/manage-surveyBase.component.css"],

## App Module

App Module
import { SurveyBaseComponent } from "./surveys/manage-surveyBase.component"	

## Routing Module

import { SurveyBaseComponent } from "./surveys/manage-surveyBase.component"	

    { path: 'surveyBase', component: SurveyBaseComponent },
    { path: 'surveyCopy/:id', component: <nothing yet> },
	{ path: 'surveyCopyEdit/:id', component: <nothing yet>SurveyCopyEditComponent },

## API Route
api route:  /api/admin/surveyBase

## Imports for component (copy from similar template)
import { AdminService } from "../App/admin/admin.service";
import { ISurvey } from "../models/survey"
import { ISurveyBase} from '../App/admin/model/surveyBase'

## Steps for completion of check-in

* update selector, templateUrl, styleUrls
* update app module
* update service  (surveyBaseCreate)
   getSurveyBase(id: number): Observable<ISurveyBase[]> 
   {
        var fullUrl = this.baseUrl + '/api/admin/surveyBase/' + id;
        return this._http.get(fullUrl)
            .catch(this.handleError)
            .map(res => res.json());
    }
* be sure Data objects and classes are correctly located

export interface ISurveyBase {
    id: number;
    name: string;
    surveyTypeCode: string;
    leaverYear?: string;
    tokenizedName: string;
}

#RELATED#

    { path: 'surveyQuestionDetails/:id', component: SurveyDetailComponent, resolve: { something: SurveyDetailResolver }  },
    { path: 'surveyQuestions/:id', component: SurveyQuestionComponent, resolve: { surveyQuestion: SurveyQuestionResolver }  },



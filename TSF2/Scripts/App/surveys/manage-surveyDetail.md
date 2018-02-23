# Seed3 
I copied from Seed1 as I needed a consistent dev env
Credit is entirely to the creator of Seed1 and not me.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

# Component Template
*SurveyDetailComponent*


## Code scaffolding

_folder_ manage-surveys:

manage-surveyDetail.component.css
manage-surveyDetail.component.html
manage-surveyDetail.component.ts



## Component Structure

_@Component_    
   1. selector: "survey-detail",


    1. selector: "survey-detail",  
    2. templateUrl: "App/surveys/manage-surveyDetail.component.html",
    3. styleUrls: ["App/surveys/manage-surveyDetail.component.css"],

## App Module

App Module
import { SurveyDetailComponent } from "./surveys/manage-surveyDetail.component"	

## Routing Module

import { SurveyDetailComponent } from "./App/surveys/manage-surveyDetail.component.css"	

    { path: 'surveyDetails/:id', component: SurveyDetailComponent },
    { path: 'surveyDetails', component: SurveyDetailComponent },

## API Route
api route:  /api/admin/surveyQuestionDetails

## Steps for completion of check-in

* update selector, templateUrl, styleUrls
* update app module
* update service  (surveyDetailCreate)
* be sure Data objects and classes are correctly located

## Notes
Survey level 2 is here named Survey Detail.  The http Post represents a copy from master to detail.
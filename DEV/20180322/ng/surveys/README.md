# Seed3 
I copied from Seed1 as I needed a consistent dev env
Credit is entirely to the creator of Seed1 and not me.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

# Component Template
*SurveyLevel2Component*


## Code scaffolding

_folder_ manage-surveys:

manage-surveyLevel2.component.css
manage-surveyLevel2.component.html
manage-surveyLevel2.component.ts


## Component Structure

_@Component_ 
   * selector: "survey-level2",
    templateUrl: '../../admin/manage-surveys/manage-surveyLevel2.component.html',
    styleUrls: ["../../admin/manage-surveys/manage-surveyLevel2.component.css"],

## App Module

App Module
import { ManageSurveyFormAddComponent } from "./App/admin/SurveyLevel2Component.component"	

## Routing Module

import { SurveyLevel2Component } from "./App/admin/SurveyLevel2Component.component"	

## API Route
api route:  /api/admin/gensurveyQuestionDetailsAdd

## Steps for completion

* copy from template to files per naming conventions
* update selector, templateUrl, styleUrls
* update app module
* update service  (surveyDetailCreate)

## Notes
Level 2 will add records from master to detail
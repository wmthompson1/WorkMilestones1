// C:\thompson\src\repos\seed6 - Kendo\src\app\app.module.ts
import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routing";
import {AppComponent} from "./app";

//kendo
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';

import "rxjs/Rx";

import { PsService } from "./App/post-school/ps.service";


import {Github} from "./github/shared/github";
import {FormsModule} from "@angular/forms";

import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {About} from './about/about';
import {Home} from './home/home';
import {Master} from './home/master';
import {RepoBrowser} from './github/repo-browser/repo-browser';
import {RepoList} from './github/repo-list/repo-list';
import {RepoDetail} from './github/repo-detail/repo-detail';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { PublisherService } from './services/publishers.service'
import { AppConfig } from './app.config'
import { FormAdd } from './home/form-add';
import { FormEdit } from './home/form-edit';
import { FormDelete } from './home/form-delete';
import { ManageSurveyComponent } from './home/manage-survey.component';
import { SurveyService } from './services/surveys.service'
//import { SurveyRenderComponent } from './home/survey-render.component'
import { TsfFooterComponent } from './home/tsf-footer.component'
import { SurveyRenderComponent } from "./App/admin/survey-render.component";

import { AdminService } from "./App/admin/admin.service";
import { ManageSurveyFormEditComponent } from "./App/admin/manage-surveyFormEdit.component"
import { SurveyGridComponent} from "./App/admin/survey-grid.component"

import { SurveyDetailComponent } from "./App/surveys/manage-surveyDetail.component"
import { SurveyQuestionComponent} from "./App/surveys/manage-surveyQuestion.component"

// _ C:\thompson\src\repos\seed6 - Kendo\src\app\App\admin\manage-user\user-list.component.ts _   
import { UserListComponent } from "./App/admin/manage-user/user-list.component"
import { UserListResolver } from "./App/admin/user-list-resolver.service"
import { SurveyResolver } from "./App/surveys/manage-surveyResolver.service"

import { SurveyQuestionResolver } from "./App/surveys/manage-surveyQuestionResolver.service"
import { SurveyDetailResolver } from "./App/surveys/manage-surveyDetailResolver.service"

import { SurveyBaseComponent } from "./App/surveys/manage-surveyBase.component"	
import { SurveyBaseEditComponent } from "./App/surveys/manage-surveyBaseEdit.component"	

// C:\thompson\src\repos\seed6 - Kendo\src\app\App\surveys\manage-surveyQuestionResolver.service.ts

//C:\thompson\src\repos\seed6 - Kendo\src\app\app.module.ts

//C:\thompson\src\repos\seed6 - Kendo\src\app\App\surveys\manage-surveyResolver.service.ts

import { AuthService } from "./App/auth.service"
// AuthHttp
import { AuthHttp } from "./App/auth.http"

// _ C:\thompson\src\repos\seed6 - Kendo\src\app\App\auth.service.ts _

@NgModule({
  declarations: [AppComponent, About, RepoBrowser 
        , RepoList, RepoDetail, Home, Master, FormAdd, FormEdit
        , FormDelete,ManageSurveyComponent,TsfFooterComponent
        , SurveyRenderComponent, ManageSurveyFormEditComponent,SurveyGridComponent
        , SurveyDetailComponent, SurveyQuestionComponent, UserListComponent
        , SurveyBaseComponent, SurveyBaseEditComponent ],

  imports     : [BrowserModule, FormsModule, HttpModule,BrowserAnimationsModule, GridModule
        , HttpClientModule
        , RouterModule.forRoot(rootRouterConfig)],
  providers   : [Github, UserListResolver, SurveyResolver, SurveyQuestionResolver, SurveyDetailResolver, AdminService , AuthService, AuthHttp ,{provide: LocationStrategy, useClass: HashLocationStrategy}
	,PublisherService, AppConfig ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}

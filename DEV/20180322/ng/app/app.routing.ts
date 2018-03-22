import {Routes, RouterModule} from '@angular/router';
import {About} from './about/about';
import {Home} from './home/home';
import {Master} from './home/master';
import {RepoBrowser} from './github/repo-browser/repo-browser';
import {RepoList} from './github/repo-list/repo-list';
import {RepoDetail} from './github/repo-detail/repo-detail';
import { FormAdd } from './home/form-add';
import { FormEdit } from './home/form-edit';
import { FormDelete } from './home/form-delete';
import { SurveyRenderComponent } from "./App/admin/survey-render.component";
import { ManageSurveyFormEditComponent } from "./App/admin/manage-surveyFormEdit.component";
import { SurveyGridComponent } from "./App/admin/survey-grid.component";
//import { SurveyLevel2Component } from "./App/admin/manage-surveys/manage-surveyLevel2.component";
//import { SurveyLevel2FormAddComponent} from "./App/admin/manage-surveys/manage-surveyFormAddDetail";
import { SurveyDetailComponent } from "./App/surveys/manage-surveyDetail.component"
import { SurveyQuestionComponent} from "./App/surveys/manage-surveyQuestion.component"

import { AuthGuard } from "./App/guards/auth.guard";
import { AdminGuard } from "./App/guards/admin.guard";

import { UserListComponent } from "./App/admin/manage-user/user-list.component"
import { UserListResolver } from "./App/admin/user-list-resolver.service"
import { SurveyResolver } from "./App/surveys/manage-surveyResolver.service"
import { SurveyQuestionResolver } from "./App/surveys/manage-surveyQuestionResolver.service"
import { SurveyDetailResolver } from "./App/surveys/manage-surveyDetailResolver.service"
import { SurveyBaseComponent } from "./App/surveys/manage-surveyBase.component"	
import { SurveyBaseEditComponent } from "./App/surveys/manage-surveyBaseEdit.component"	

export const rootRouterConfig: Routes = [
 
//    { path: 'home', component: Home, resolve: { userList: UserListResolver }  },
 //   { path: 'home', component: SurveyGridComponent , resolve: { surveys: SurveyResolver } },
    { path: "home", component: Home },
  //  { path: 'surveyQuestions/:id', component: Home },
    { path: 'master', component: Master },
    { path: 'formAdd', component: FormAdd },
    { path: 'formEdit/:id', component: FormEdit },
    { path: 'formDelete/:id', component: FormDelete },
    { path: 'survey-render', component: SurveyGridComponent , resolve: { surveys: SurveyResolver } },
    { path: 'surveyFormEdit/:id', component: ManageSurveyFormEditComponent },
    { path: 'surveyDetails/:id', component: SurveyDetailComponent, resolve: { something: SurveyDetailResolver }  },
    { path: 'surveyQuestions/:id', component: SurveyQuestionComponent, resolve: { surveyQuestion: SurveyQuestionResolver }  },
    { path: 'surveyBase', component: SurveyBaseComponent },
    { path: 'surveyBase/:id', component: SurveyBaseEditComponent },
    { path: "user-list", component: UserListComponent, resolve: { userList: UserListResolver } },
    { path: 'about', component: About},
    { path: '**', component: Home}
    // {path: 'github', component: RepoBrowser,
    //   children: [
    //     {path: '', component: RepoList},
    //     {path: ':org', component: RepoList,
    //       children: [
    //         {path: '', component: RepoDetail},
    //         {path: ':repo', component: RepoDetail}
    //       ]
    //     }]
    // }
  ];


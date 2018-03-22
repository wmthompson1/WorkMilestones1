// C:\thompson\src\repos\seed6 - Kendo\src\app\App\surveys\manage-surveyQuestionResolver.service.ts
//    { path: 'surveyQuestions/:id', component: SurveyQuestionComponent, resolve: { survey_question: SurveyQuestionResolver }  },
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
//import { AuthService } from "../auth.service";

import { AdminService } from "../../App/admin/admin.service";

// C:\thompson\src\repos\seed6 - Kendo\src\app\App\admin\admin.service.ts 
import { ISurveyQuestion } from "../surveys/model/surveyQuestion";
// _ model C:\thompson\src\repos\seed6 - Kendo\src\app\models\survey.ts _   
// C:\thompson\src\repos\seed6 - Kendo\src\app\App\admin\user-list-resolver.service.ts

@Injectable()
export class SurveyQuestionResolver implements Resolve<ISurveyQuestion[]> {
    constructor(private as: AdminService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISurveyQuestion[]> {
       
        return this.as
          .getSurveyQuestion(route.params.id)
          .map(surveys => {
            if (surveys.length > 0) {
                return surveys;
            } else {
                this.router.navigate(['/surveyQuestions']);
                return null;
            }
        });
    }
}
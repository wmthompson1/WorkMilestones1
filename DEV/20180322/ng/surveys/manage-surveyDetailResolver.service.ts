// C:\thompson\src\repos\seed6 - Kendo\src\app\App\surveys\manage-surveyDetailResolver.service.ts
//    { path: 'surveyQuestions/:id', component: SurveyQuestionComponent, resolve: { survey_question: SurveyQuestionResolver }  },
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


import { AdminService } from "../../App/admin/admin.service";

import { ISurveyQuestionDetail } from "../surveys/model/surveyQuestionDetail";


@Injectable()
export class SurveyDetailResolver implements Resolve<ISurveyQuestionDetail[]> {
    constructor(private as: AdminService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISurveyQuestionDetail[]> {
       
        return this.as
          .surveyDetailGetById(route.params.id).take(1)
          .map(xx => {
            console.log(xx.length)
            if (xx.length > 0) {
                return xx;

            } else {
             
 
                this.router.navigate(['/home']);
                return null;
                
            }
        })
        ;
    }
}
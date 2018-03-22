// C:\thompson\src\repos\seed6 - Kendo\src\app\App\surveys\manage-surveyResolver.service.ts
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
//import { AuthService } from "../auth.service";

import { AdminService } from "../../App/admin/admin.service";

// C:\thompson\src\repos\seed6 - Kendo\src\app\App\admin\admin.service.ts 
import { ISurvey } from '../../models/survey';
// _ model C:\thompson\src\repos\seed6 - Kendo\src\app\models\survey.ts _   
// C:\thompson\src\repos\seed6 - Kendo\src\app\App\admin\user-list-resolver.service.ts

@Injectable()
export class SurveyResolver implements Resolve<ISurvey[]> {
    constructor(private as: AdminService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISurvey[]> {
        
        return this.as.surveyGetAll().map(surveys => {
            if (surveys.length > 0) {
                return surveys;
            } else {
                this.router.navigate(['/survey-render']);
                return null;
            }
        });
    }
}
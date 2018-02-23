import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { SuccessResponse } from "../../model/SuccessResponse";

@Injectable()
export class UserConfirmResolver implements Resolve<SuccessResponse>{
    route: any;
    token: string;
    userId: string;

    constructor(private as: AuthService, private router: Router) {
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SuccessResponse> {
        return this.as
            .confirmUserEmail(route.params.code, route.params.userId)
            .map(success => {
                if (success.success != null) {
                    return success;
                }
                else {
                    this.router.navigate(['/login']);
                    return null;
                }
            });
    }
}

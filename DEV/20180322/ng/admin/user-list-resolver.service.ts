import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from "../auth.service";
import { User } from '../User';

// C:\thompson\src\repos\seed6 - Kendo\src\app\App\admin\user-list-resolver.service.ts

@Injectable()
export class UserListResolver implements Resolve<User[]> {
    constructor(private as: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
        
        return this.as.getAll().map(userList => {
            if (userList.length > 0) {
                return userList;
            } else {
                this.router.navigate(['/home']);
                return null;
            }
        });
    }
}
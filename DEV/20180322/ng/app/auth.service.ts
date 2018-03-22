import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "./auth.http";
import { User } from "./user";
import { SuccessResponse } from "./admin/model/SuccessResponse";
import { Role } from "./admin/model/Role";
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { AppConfig } from '../app.config';

// C:\thompson\src\repos\seed6 - Kendo\src\app\app.config.ts

// C:\thompson\src\repos\seed6 - Kendo\src\app\App\auth.service.ts

@Injectable()
export class AuthService {
    authKey = "auth";
    baseUrl: string = "";

    constructor(private http: HttpClient,  private config: AppConfig) {
        //this.baseUrl = window.location.origin;
        this.baseUrl = this.config.apiUrl
    }

    login(username: string, password: string): any {
        var url = "api/connect/token";
        var data = {
            username: username,
            password: password,
            client_id: "TSF",
            grant_type: "password",
            scope: "offline_access profile email"
        };
        let headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");
        
        let options = {
            headers: headers
        };
        return this.http.post(url, this.toUrlEncodedString(data), options)
            .map(response => {
                var auth = response;                
                this.setAuth(auth);
                return auth;
            });
    }

    logout(): any {
        return this.http.post(
                "api/Accounts/Logout",
                null)
            .map(response => {
                this.setAuth(null);
                return true;
            })
            .catch(err => {
                return Observable.throw(err);
            });
    }

    toUrlEncodedString(data: any) {
        var body = "";
        for (var key in data) {
            if (body.length) {
                body += "&";
            }
            body += key + "=";
            body += encodeURIComponent(data[key]);
        }
        return body;
    }

    setAuth(auth: any): boolean {
        if (auth) {
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        } else {
            localStorage.removeItem(this.authKey);
        }
        return true;
    }

    getAuth(): any {
        var i = localStorage.getItem(this.authKey);
        if (i) {
            return JSON.parse(i);
        } else {
            return null;
        }
    }

    isLoggedIn(): boolean {
        return localStorage.getItem(this.authKey) != null;
    }

    get(id: string): Observable<any> {
        return this.http.get("api/accounts/get/" + id);            
    }

    getAll(): Observable<any> {
        let fullUrl = this.baseUrl + "/api/accounts/getall"; 
        return this.http
            .get(fullUrl)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });//this.http.getCM("/api/accounts/getall")               
    }

    add(user: any) {
        var fullUrl = this.baseUrl + "/api/accounts/add";
        var data = {
            UserName: user.UserName,
            Password: ' ',
            PasswordNew: ' ',
            Email: user.Email,
            FName: user.FName,
            LName: user.LName,
            District: user.District,
            DisplayName: user.DisplayName,
            DistrictId: user.DistrictId,
            Roles: user.Roles,
            Id: "",
            Agencies: user.Agencies
        };
        return this.http.post(fullUrl, JSON.stringify(data))
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });            
    }

    update(user: any) {
        return this.http.put("/api/accounts", user)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });            
    }

    changePassword(reset: any): any {
        var fullUrl = this.baseUrl + "/api/accounts/changepassword"; 
        var data = {
            Username: reset.Username,
            Newpassword: reset.Newpassword,
            Oldpassword: reset.Oldpassword,
            Newpasswordconfirm: reset.Newpasswordconfirm
        };
        return this.http.post(fullUrl, data)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });            
    }

    sendEmailReset(email: any): any {
        var fullUrl = this.baseUrl + "/api/accounts/emailpasswordreset";
        var data = {
            email: email.email
        };
        return this.http.post(fullUrl, data)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });            
    }

    setPassword(confirm: any): any {
        var fullUrl = this.baseUrl + "/api/accounts/setPasswordToken";
        var data = {
            UserId: confirm.UserId,
            Token: confirm.Token,
            Password: confirm.Password,
            PasswordConfirm: confirm.PasswordConfirm
        };
        return this.http.post(fullUrl, data)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    confirmUserEmail(code: string, userId: string): Observable<any> {
        var fullUrl = this.baseUrl + "/api/accounts/EmailConfirm";
        var data = {
            token: code,
            userId: userId,
            password: 'Password1!',
            passwordConfirm: ''
        };
        return this.http.post(fullUrl, data)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    remove(id: string) {
        var fullUrl = this.baseUrl + "/api/accounts/deleteuser/" + encodeURIComponent(id);
        
        return this.http.get(fullUrl)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    isUserInRole(roleName: string): Observable<boolean> {
        var fullUrl = "/api/accounts/isinrole";
        let params = new HttpParams().set('RoleName', roleName);
        return this.http.get(fullUrl, { params: params })
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    deleteRole(id: string) {
        var fullUrl = this.baseUrl + "/api/accounts/deleterole/" + encodeURIComponent(id);
        return this.http.get(fullUrl)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    getAllRoles(): Observable<any> {
        var fullUrl = this.baseUrl + "/api/accounts/getallroles";
        return this.http.get(fullUrl)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    addRole(name: string) {
        var fullUrl = this.baseUrl + "/api/accounts/addrole/" + name;        
        return this.http.get(fullUrl)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    saveRole(name: string, id: string): any {
        var fullUrl = this.baseUrl + "/api/accounts/updaterole/" + id + "/" + name;        
        return this.http.get(fullUrl)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    isInPsRole(): Observable<boolean> {
        let fullUrl = this.baseUrl + "/api/accounts/isinpsrole";
        return this.http.get(fullUrl)
            .catch((err: HttpErrorResponse) => {
                console.error(err.error);
                return Observable.empty<any>();
            });
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}
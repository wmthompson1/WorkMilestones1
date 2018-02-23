import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "./auth.http";
import { User } from "./user";
import { SuccessResponse } from "./admin/model/SuccessResponse";
import { Role } from "./admin/model/Role";

@Injectable()
export class AuthService {
    authKey = "auth";
    baseUrl: string = "";

    constructor(private http: AuthHttp) {
        this.baseUrl = window.location.origin;
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

        return this.http.post(
                url,
                this.toUrlEncodedString(data),
                new RequestOptions({
                    headers: new Headers({
                        "Content-Type": "application/x-www-form-urlencoded"
                    })
                }))
            .map(response => {
                var auth = response.json();
                console.log("The following auth JSON object has been received:");
                console.log(auth);
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

    get() {
        return this.http.get("api/accounts/get")
            .map(response => response.json());
    }

    getAll() {
        return this.http.get("api/accounts/getall")
            .map(res => res.json());
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
        return this.http.post(
            fullUrl,
                JSON.stringify(data),
                new RequestOptions({
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                }))
            .map(response => response.json());
    }

    update(user: User) {
        return this.http.put(
                "/api/accounts",
                JSON.stringify(user),
                new RequestOptions({
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                }))
            .map(response => response.json());
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
            .map(res => res.json());
    }

    sendEmailReset(email: any): any {
        var fullUrl = this.baseUrl + "/api/accounts/emailpasswordreset";
        var data = {
            email: email.email
        };
        return this.http.post(fullUrl, data)
            .map(res => res.json());
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
            .map(res => res.json());
    }

    confirmUserEmail(code: string, userId: string): Observable<SuccessResponse> {
        var fullUrl = this.baseUrl + "/api/accounts/EmailConfirm";
        var data = {
            token: code,
            userId: userId,
            password: 'Password1!',
            passwordConfirm: ''
        };
        return this.http.post(fullUrl, data)
            .map(res => res.json());
    }

    remove(id: string) {
        var fullUrl = this.baseUrl + "/api/accounts/deleteuser/" + encodeURIComponent(id);
        
        return this.http.get(fullUrl)
            .map(res => res.json());
    }

    isUserInRole(user: any): Observable<boolean> {
        var fullUrl = "/api/accounts/isinrole";
        var data = {
            UserId: user.Id,
            RoleName: user.RoleName
        };
        return this.http.get(fullUrl, data)
            .map(res => res.json());
    }

    deleteRole(id: string) {
        var fullUrl = this.baseUrl + "/api/accounts/deleterole/" + encodeURIComponent(id);
        return this.http.get(fullUrl)
            .map(res => res.json());
    }

    getAllRoles(): Observable<Role[]> {
        var fullUrl = this.baseUrl + "/api/accounts/getallroles";
        return this.http.get(fullUrl)
            .map(res => res.json());
    }

    addRole(name: string) {
        var fullUrl = this.baseUrl + "/api/accounts/addrole/" + name;        
        return this.http.get(fullUrl)
            .map(res => res.json());
    }

    saveRole(name: string, id: string): any {
        var fullUrl = this.baseUrl + "/api/accounts/updaterole/" + id + "/" + name;        
        return this.http.get(fullUrl)
            .map(res => res.json());
    }
}
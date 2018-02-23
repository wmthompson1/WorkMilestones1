import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { UserCreateComponent } from "../admin/manage-user/user-edit/user-create.component";

@Component({
    selector: "login",
    templateUrl: "app/login/login.component.html",
    providers: [AuthService]
})
export class LoginComponent {
    title: string = "Login";
    loginForm = null;
    loginError = false;
    externalProviderWindow = null;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(["/home"]);
        }
        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }
    performLogin(e) {
        e.preventDefault();
        //alert(JSON.stringify(this.loginForm.value));
        var username = this.loginForm.value.username;
        var password = this.loginForm.value.password;

        this.authService.login(username, password)
            .subscribe((data) => {
                    this.loginError = false;
                    var auth = this.authService.getAuth();
                    //alert("Our Token is: " + auth.access_token);
                    this.router.navigate(["/home"]);
                },
                (err) => {
                    console.log(err);
                    this.loginError = true;
                });
    }

    //onRegister() {
    //    this.router.navigate(["register"]);
    //}

    //callExternalLogin(providerName: string) {
    //    var url = "api/Accounts/ExternalLogin/" + providerName;

    //    var w = (screen.width > 1050) ? 1050 : screen.width;
    //    var h = (screen.height > 550) ? 550 : screen.height;

    //    var params = "toolbar=yes, scrollbars=yes,resizable=yes,width=" + w + ",height=" + h;
    //    if (this.externalProviderWindow) {
    //        this.externalProviderWindow.close();
    //    }
    //    this.externalProviderWindow = window.open(url, "ExternalProvider", params, false);
    //}
}
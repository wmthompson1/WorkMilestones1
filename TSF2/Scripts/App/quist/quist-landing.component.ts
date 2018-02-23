import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "quist-landing",
    templateUrl: "app/quist/quist-landing.component.html",
    providers: [AuthService]
})
export class QuistLandingComponent {
    title: string = "Welcome to the QuIST";

    constructor(private authService: AuthService, private router: Router) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }
}
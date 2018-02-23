import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "iep-landing",
    templateUrl: "app/iep/iep-landing.component.html",
    providers: [AuthService]
})
export class IepLandingComponent {
    title: string = "Welcome to the IEP Review home page.";
    constructor(private router: Router, private authService: AuthService) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }
}
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "iep-district-list",
    templateUrl: "app/iep/iep-district-list.component.html",
    providers: [AuthService]
})
export class IepDistrictListComponent {
    constructor(private router: Router, private authService: AuthService) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }
    title: string = "";
}
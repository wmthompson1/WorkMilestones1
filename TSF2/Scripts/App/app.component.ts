import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: "app-root",    
    templateUrl: "app/app.component.html"//,
    //styleUrls: ["bootstrap.min.css"]
})
export class AppComponent {
    
    constructor(public router: Router, public authService: AuthService, public zone: NgZone) {
        //if (!(<any>window).externalProviderLogin) {
        //    (<any>window).externalProviderLogin = auth => {
        //        this.zone.run(() => {
        //            this.externalProviderLogin(auth);
        //        });
        //    }
        //}        
    }

    isActive(data: any[]): boolean {
        return this.router.isActive(this.router.createUrlTree(data), true);
    }

    checkLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }      

    logout(): boolean {
        this.authService.logout().subscribe(result => {
            if (result) {
                this.router.navigate([""]);
            }
        });
        return false;
    }
    
    //externalProviderLogin(auth: any) {
    //    this.authService.setAuth(auth);
    //    console.log("External Login successful!");
    //    this.router.navigate(["/home"]);
    //}

    title: string = "Transition Systemic Framework";

}
import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StateTarget } from "../../model/StateTarget";
import { AdminService } from "../../admin.service";
import { AuthService } from "../../../auth.service";

@Component({
    templateUrl: "/app/admin/manage-state-target/add-target/add-target.component.html",
    selector: "add-target",
    providers: [AdminService, AuthService],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["app/admin/manage-state-target/add-target/add-target.component.css"]
})
export class AddTargetComponent {
    title: string = "Add new State Target";
    years: Array<string> = ["2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16", "2016-17", "2017-18", "2018-19", "2019-20"];
    types: Array<string> = ["Indicator13", "Indicator14", "QuIST"];
    options: Array<string> = ["ContactRate"];
    model: StateTarget = new StateTarget(1, " ", " ", " ", +"");
    targetValue: number;
    schoolYear: string;
    targetName: string;
    targetType: string;
    

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router, private authService: AuthService) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }

    cancel() {
        this.router.navigate(["/manage_state_targets"]);
    }

    submit() {
        this.adminService.addTarget(this.model).subscribe(res => window.alert("Target add succeeded."),
            error => window.alert("Target add failed."), () => this.router.navigate(["/manage_state_targets"]));
    }
}
import { Component, ViewEncapsulation, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StateTarget } from "../../model/StateTarget";
import { AdminService } from "../../admin.service";

@Component({
    templateUrl: "/app/admin/manage-state-target/edit-target/edit-target.component.html",
    selector: "edit-target",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["app/admin/manage-state-target/edit-target/edit-target.component.css"],
    providers: [AdminService]
})
export class EditTargetComponent {
    title: string = "Edit State Component";
    years: Array<string> = ["2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16", "2016-17", "2017-18", "2018-19", "2019-20"];
    types: Array<string> = ["Indicator13", "Indicator14", "QuIST"];
    options: Array<string> = ["ContactRate"];
    model: StateTarget;

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router, private zone: NgZone) {
        this.model = {
            id: this.route.snapshot.params["id"], schoolYear: this.route.snapshot.params["schoolYear"], targetType: this.route.snapshot.params["targetType"], targetName: this.route.snapshot.params["targetName"], targetValue: this.route.snapshot.params["targetValue"]};
    }

    cancel() {
        window.history.back();
        //this.router.navigate(["/manage_state_targets"]);
    }

    submit() {
        this.adminService.editTarget(this.model)
            .subscribe(res => {
                window.alert("Target edit succeeded.");
                this.router.navigate(["/manage_state_targets"]);
            }),
            error => window.alert("Target edit failed.");            
    }
}
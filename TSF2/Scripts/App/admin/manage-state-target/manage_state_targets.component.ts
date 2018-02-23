import { Component, ViewEncapsulation } from "@angular/core";
import { StateTarget } from "../model/StateTarget";
import { AdminService } from "../../admin/admin.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "manage-targets",
    templateUrl: "app/admin/manage-state-target/manage_state_targets.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [AdminService],
    styleUrls: ["app/admin/manage-state-target/manage_state_targets.component.css"]    
})
export class StateTargetsComponent {
    title: string = "Manage State Targets";
    targets: StateTarget[];
    
    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
        this.getData();
    }    

    getData() {

        this.adminService.getStateTargets()
            .subscribe(res => this.targets = res);
    }

    getValueDecimal(value: number): string {
        return value.toFixed(3);
    }
    
    addTarget() {
        this.router.navigate(["/add-target"]);
    }

    editTarget(target: StateTarget) {           
        this.router.navigate(["/edit-target", target.targetValue, target.id, target.schoolYear, target.targetType, target.targetName]);        
    }
}
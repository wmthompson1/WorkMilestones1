import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth.service";
import { Role } from "../model/Role";

@Component({
    templateUrl: "app/admin/manage-role/roles-list.component.html",
    selector: "roles-list",
    providers: [AuthService]
})
export class RolesListComponent implements OnInit {
    title: string = "Manage Roles";
    roles: Array<Role> = [];

    constructor(private router: Router, private as: AuthService, private activatedRoute: ActivatedRoute) {
        if (!this.as.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.as.getAllRoles()
            .subscribe(res => this.roles = res);
    }

    add() {
        this.router.navigate(['/add-role']);
    }

    delete(id: any) {
        let role = this.roles.find(i => i.id = id);
        let roleId = this.roles.indexOf(role);
        
        this.as.deleteRole(id)
            .subscribe(res => {
                if (res.error == null) {
                    window.alert("Role deleted successfully.");
                    this.roles.splice(roleId, 1);
                } else {
                    window.alert("Role delete failed.");
                }
            },
            (err) => {
                window.alert(err);
            });
    }

    edit(role: Role) {
        this.router.navigate(['/edit-role/', role.name, role.id]);
    }
}
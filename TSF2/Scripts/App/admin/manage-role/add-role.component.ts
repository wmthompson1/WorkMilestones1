import { Component } from "@angular/core";
import { AuthService } from "../../auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "add-role",
    templateUrl: "app/admin/manage-role/add-role.component.html",
    providers: [AuthService]
})

export class AddRoleComponent {
    title: string = "Add Role";
    roleForm: FormGroup = null;

    constructor(private as: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
        if (!this.as.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }
    }

    ngOnInit() {
        this.roleForm = this.fb.group(
            {
                name: ["", null]
            }
        );
    }

    onSubmit() {
        this.as.addRole(this.roleForm.controls['name'].value)
            .subscribe(res => {
                if (res.error == null) {
                    window.alert("Role added successfully.");
                    this.router.navigate(['/roles']);
                } else {
                    window.alert("Role add failed.");
                }
            },
            (err) => {
                alert(err);
            });
    }

    cancel() {
        this.router.navigate(['roles']);
    }
}
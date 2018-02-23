import { Component } from "@angular/core";
import { AuthService } from "../../auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "role-edit",
    templateUrl: "app/admin/manage-role/edit-role.component.html",
    providers: [AuthService]
})
export class EditRoleComponent {
    title: string = "Role Edit";
    id: string;
    editRoleForm: FormGroup = null;

    constructor(private as: AuthService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
        if (!this.as.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        this.editRoleForm = this.fb.group(
            {
                name: ["", null]                
            }
        );
    }

    onSubmit() {
        this.as.saveRole(this.editRoleForm.controls['name'].value, this.id)
            .subscribe(res => {
                if (res.error == null) {
                    window.alert("Role edit succeeded.");
                    this.router.navigate(['/roles']);
                } else {
                    window.alert("Role edit failed.");
                }
            },
            (err) => {
                window.alert(err);
            });
    }

    cancel() {
        this.router.navigate(['roles']);
    }
}
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../auth.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SuccessResponse } from "../../model/SuccessResponse";

@Component({
    selector: "user-confirm",
    providers: [AuthService],
    templateUrl: "app/admin/manage-user/user-confirm/user-confirm.component.html"
})
export class UserConfirmComponent {
    code: string;
    userId: string;
    errorMessage: string;
    title: string = "Set new password";
    setPasswordForm: FormGroup = null;

    constructor(private fb: FormBuilder, private router: Router, private as: AuthService, private route: ActivatedRoute) {
        this.code = this.route.snapshot.params["code"];
        this.userId = this.route.snapshot.params["userId"];   
    }

    ngOnInit() {

        this.route.data
            .subscribe((success: { success: SuccessResponse }) => { });

        this.setPasswordForm = this.fb.group(
            {
                Token: ["", null],
                UserId: ["", null],
                Password: [
                    "", [
                        Validators.required,
                        Validators.minLength(8)
                    ]
                ],
                PasswordConfirm: [
                    "", [
                        Validators.required,
                        Validators.minLength(8)
                    ]
                ],
                NeedToken: ["", null]
            },
            {
                validator: this.compareValidator("Password", "PasswordConfirm")
            }
        );
    }

    compareValidator(fc1: string, fc2: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[fc1];
            let passwordConfirm = group.controls[fc2];

            if (password.value === passwordConfirm.value) {
                return null;
            }
            return { compareFailed: true }
        }
    }

    onSubmit() {
        this.setPasswordForm.controls['Token'].setValue(' ');
        this.setPasswordForm.controls['UserId'].setValue(this.userId);
        
        this.as.setPassword(this.setPasswordForm.value)
            .subscribe((data) => {
                if (data.error == null) {
                    this.errorMessage = null;
                    alert("Password was successfully set.");
                    this.router.navigate(['/login']);
                } else {
                    this.errorMessage = data.error;
                    alert(data.error);
                }
            },
            (err) => {
                this.errorMessage = err;
                alert("Password set failed.");
            });        
    }
}
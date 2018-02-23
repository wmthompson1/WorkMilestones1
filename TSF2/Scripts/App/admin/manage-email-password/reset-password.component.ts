import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "reset-password",
    templateUrl: "app/admin/manage-email-password/reset-password.component.html",
    providers: [AuthService],
    encapsulation: ViewEncapsulation.None
})

export class ResetPasswordComponent implements OnInit {
    title: string = "Reset Password";
    passwordForm: FormGroup = null;
    errorMessage = null;

    constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {

    }

    ngOnInit() {
        this.passwordForm = this.fb.group(
            {
                Username: [
                    "", [
                        Validators.required,
                        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9-](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                    ]
                ],
                Newpassword: [
                    "", [
                        Validators.required,
                        Validators.minLength(8)
                    ]
                ],
                Newpasswordconfirm: [
                    "", [
                        Validators.required,
                        Validators.minLength(8)
                    ]
                ],
                Oldpassword: ["", null]
            },
            {
                validator: this.compareValidator("Newpassword", "Newpasswordconfirm")
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
        this.authService.changePassword(this.passwordForm.value)
            .subscribe((data) => {
                if (data.error == null) {
                    this.errorMessage = null;
                    alert("Password was successfully reset!");
                    this.router.navigate(['/login']);
                }
                else {                    
                    this.errorMessage = data.error;
                    alert(data.error);
                }
            },
            (err) => {
                this.errorMessage = err;
            });
    }
}
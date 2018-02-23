import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "confirm-password",
    templateUrl: "app/admin/manage-email-password/confirm-password.component.html",
    providers: [AuthService],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmPasswordComponent implements OnInit {
    title: string = "Set your password";
    userToken: string;
    userId: string;
    confirmForm: FormGroup = null;
    errorMessage = null;

    constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder) {
        this.userToken = this.route.snapshot.params['code'];
        this.userId = this.route.snapshot.params['userId'];
    }

    ngOnInit() {
        this.confirmForm = this.fb.group(
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
                ]
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
        this.confirmForm.controls['Token'].setValue(this.userToken);
        this.confirmForm.controls['UserId'].setValue(this.userId);
        this.authService.setPassword(this.confirmForm.value)       
            .subscribe((data) => {
                if (data.error == null) {
                    this.errorMessage = null;
                    alert("Password was successfully set!");
                    this.router.navigate(['/login']);
                }
                else {
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
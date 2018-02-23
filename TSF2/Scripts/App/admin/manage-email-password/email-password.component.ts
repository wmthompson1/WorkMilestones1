import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth.service";

@Component({
    providers: [AuthService],
    templateUrl: "app/admin/manage-email-password/email-password.component.html",
    encapsulation: ViewEncapsulation.None,
    selector: "email-reset"
})

export class EmailPasswordResetComponent {
    title: string = "Email Password Reset";
    emailForm: FormGroup = null;
    errorMessage: string = null;

    constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
        
    }

    ngOnInit() {
        this.emailForm = this.fb.group(
            {
                email: [
                    "", [
                        Validators.required,
                        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9-](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                    ]
                ]
            }
        );
    }

    onSubmit() {
        this.authService
            .sendEmailReset(this.emailForm.value)
            .subscribe((data) => {
                if (data.error == null) {
                    alert("Password Reset Email Sent!");
                    this.router.navigate(["/login"]);
                } else {
                    this.errorMessage = data.error;
                }
            },
            (err) => {
                alert("Password Reset Failed.");
                this.errorMessage = err;
            });            
    }
}
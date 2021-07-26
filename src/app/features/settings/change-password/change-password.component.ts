import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';
import {ValidationService} from 'src/app/core/services/validation.service';
import {Message} from 'primeng/api';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    passwordForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    msgs: Message[] = [];

    constructor(private formBuilder: FormBuilder, private router: Router, private toastService: ToastService,
                private authenticationService: AuthenticationService) {

        this.passwordForm = this.formBuilder.group({
            password: [null, Validators.compose([Validators.required])],
            newPassword: [null, Validators.compose([
                // 1. Password Field is Required
                Validators.required,
                // 2. check whether the entered password has a number
                ValidationService.patternValidator(/\d/, {hasNumber: true}),
                // 3. check whether the entered password has upper case letter
                ValidationService.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                // 4. Has a minimum length of 8 characters
                Validators.minLength(8)])
            ],

            confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {validators: [ValidationService.passwordMatchValidator]}
        );
    }

    ngOnInit(): void {
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.passwordForm.controls;
    }

    update() {
        this.toastService.clear();
        this.submitted = true;

        // stop here if form is invalid
        if (this.passwordForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.changePassword(this.f.password.value, this.f.newPassword.value, this.f.confirmPassword.value)
            .pipe(first())
            .subscribe(
                () => {
                    this.passwordForm.reset();
                    this.router.navigateByUrl('main/dashboard');
                    this.toastService.addSingle('success', '', 'password-updated', true);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.passwordForm.reset();
                    this.toastService.addSingle('error', '', 'password-not-updated', true);
                });
    }

}

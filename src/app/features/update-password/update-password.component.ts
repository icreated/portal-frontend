import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';
import {ValidationService} from 'src/app/core/services/validation.service';
import {Message} from 'primeng/api';
import FormUtils from '../../core/utils/FormUtils';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

    token = '';
    forgotForm: UntypedFormGroup;
    loading = false;
    submitted = false;
    error = '';
    msgs: Message[] = [];

    constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute,
                private router: Router, private toastService: ToastService, private authenticationService: AuthenticationService) {

        this.forgotForm = this.formBuilder.group({
            newPassword: [null, Validators.compose([
                // 1. Password Field is Required
                Validators.required,
                // 2. check whether the entered password has a number
                ValidationService.patternValidator(/\d/, {hasNumber: true}),
                // 3. check whether the entered password has upper case letter
                ValidationService.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                // 4. Has a minimum length of 8 characters
                Validators.minLength(8),
                // 4. Has a maximum length of 20 characters
                Validators.maxLength(20)])
            ],
            confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {validators: [ValidationService.passwordMatchValidator]}
        );
    }

    ngOnInit(): void {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.token = this.route.snapshot.params['token'];
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.forgotForm.controls;
    }

    update() {
        this.toastService.clear();
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.passwordValidate(this.token, this.f.newPassword.value, this.f.confirmPassword.value)
            .subscribe(
                () => {
                    FormUtils.cleanForm(this.forgotForm);
                    this.loading = false;
                    this.router.navigateByUrl('/');
                    this.toastService.addSingle('success', '', 'password-updated', true);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.forgotForm.reset();
                    this.toastService.addSingle('error', '', 'password-not-updated', true);
                });
    }

}

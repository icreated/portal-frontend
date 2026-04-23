import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';
import {ValidationService} from 'src/app/core/services/validation.service';
import FormUtils from '../../core/utils/FormUtils';
import {UsersService} from '../../api/services/users.service';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatePasswordComponent implements OnInit {

    token = '';
    forgotForm: UntypedFormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute,
                private router: Router, private toastService: ToastService, private authenticationService: AuthenticationService,
                private userService: UsersService, private cdr: ChangeDetectorRef) {

        this.forgotForm = this.formBuilder.group({
            newPassword: [null, Validators.compose([
                Validators.required,
                ValidationService.patternValidator(/\d/, {hasNumber: true}),
                ValidationService.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                Validators.minLength(8),
                Validators.maxLength(20)])
            ],
            confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {validators: [ValidationService.passwordMatchValidator]}
        );
    }

    ngOnInit(): void {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.token = this.route.snapshot.params['token'];
    }

    get f() {
        return this.forgotForm.controls;
    }

    update() {
        this.toastService.clear();
        this.submitted = true;

        if (this.forgotForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.updateForgottenPassword({token: this.token, body: this.forgotForm.value})
            .subscribe(
                () => {
                    FormUtils.cleanForm(this.forgotForm);
                    this.loading = false;
                    this.cdr.markForCheck();
                    this.router.navigateByUrl('/');
                    this.toastService.addSingle('success', '', 'password-updated', true);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.forgotForm.reset();
                    this.cdr.markForCheck();
                    this.toastService.addSingle('error', '', 'password-not-updated', true);
                }
            );
    }

}

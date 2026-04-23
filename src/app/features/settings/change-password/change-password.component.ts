import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first, map} from 'rxjs/operators';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';
import {ValidationService} from 'src/app/core/services/validation.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import FormUtils from '../../../core/utils/FormUtils';
import {UsersService} from '../../../api/services/users.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit {

    passwordForm: UntypedFormGroup;
    loading = false;
    submitted = false;
    error = '';
    currentLang = 'en';

    constructor(private formBuilder: UntypedFormBuilder, private router: Router, private toastService: ToastService,
                private userService: UsersService, private authenticationService: AuthenticationService,
                private translateService: TranslateService, private cdr: ChangeDetectorRef) {

        this.passwordForm = this.formBuilder.group({
            password: [null, Validators.compose([Validators.required])],
            newPassword: [null, Validators.compose([
                Validators.required,
                ValidationService.patternValidator(/\d/, {hasNumber: true}),
                ValidationService.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                Validators.minLength(8)])
            ],

            confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {validators: [ValidationService.passwordMatchValidator]}
        );
    }

    ngOnInit(): void {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.currentLang = event.lang;
            this.cdr.markForCheck();
        });
    }

    get f() {
        return this.passwordForm.controls;
    }

    update() {
        this.toastService.clear();
        this.submitted = true;
        if (this.passwordForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.updatePassword(this.passwordForm.value)
            .pipe(first())
            .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.authenticationService.currentUserSubject.next(user);
              return user;
            }))
            .subscribe(
                () => {
                    this.loading = false;
                    FormUtils.cleanForm(this.passwordForm);
                    this.cdr.markForCheck();
                    this.toastService.addSingle('success', '', 'password-updated', true);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.passwordForm.reset();
                    this.cdr.markForCheck();
                    this.toastService.addSingle('error', '', 'password-not-updated', true);
                });
    }

}

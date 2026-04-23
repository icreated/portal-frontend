import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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

    private formBuilder = inject(UntypedFormBuilder);
    private router = inject(Router);
    private toastService = inject(ToastService);
    private userService = inject(UsersService);
    private authenticationService = inject(AuthenticationService);
    private translateService = inject(TranslateService);
    private cdr = inject(ChangeDetectorRef);
    private destroyRef = inject(DestroyRef);

    passwordForm: UntypedFormGroup = this.formBuilder.group({
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
    loading = false;
    submitted = false;
    error = '';
    currentLang = 'en';

    ngOnInit(): void {
        this.translateService.onLangChange
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event: LangChangeEvent) => {
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

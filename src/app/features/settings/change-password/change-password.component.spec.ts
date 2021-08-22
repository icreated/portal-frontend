import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangePasswordComponent} from './change-password.component';
import {ToastService} from '../../../core/services/toast.service';
import {AuthenticationService} from '../../../core/services/authentication-service';
import {MessageService} from 'primeng/api';
import {AppCommonModule} from '../../../app.common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {EMPTY} from 'rxjs';

describe('ChangePasswordComponent', () => {
    let component: ChangePasswordComponent;
    let fixture: ComponentFixture<ChangePasswordComponent>;
    let toastService: ToastService;
    let authenticationService: AuthenticationService;

    const PASSWORD_OLD = 'Smith1984';
    const PASSWORD_OK = 'Orwell1984';
    const PASSWORD_WITHOUT_CAPITAL = 'orwell1984';
    const PASSWORD_WITHOUT_NUMBER = 'Orwell';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangePasswordComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [MessageService],
            imports: [AppCommonModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
                HttpClientTestingModule, TranslateModule.forRoot()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        toastService = TestBed.inject(ToastService);
        authenticationService = TestBed.inject(AuthenticationService);
    });

    describe('changePassword form validation', () => {
        it('should render changePassword input', () => {
            const compiled = fixture.debugElement.nativeElement;
            const form = component.passwordForm;
            const passwordInput = compiled.querySelectorAll('app-password')[0];
            expect(passwordInput).toBeTruthy();
            const newPasswordInput = compiled.querySelectorAll('app-password')[1];
            expect(newPasswordInput).toBeTruthy();
            const confirmPasswordInput = compiled.querySelectorAll('app-password')[2];
            expect(confirmPasswordInput).toBeTruthy();
        });

        it('should test changePassword form validity', () => {
            const form = component.passwordForm;
            expect(form.valid).toBeFalsy();

            const passwordInput = form.controls.password;
            const newPasswordInput = form.controls.newPassword;
            const confirmPasswordInput = form.controls.confirmPassword;
            passwordInput.setValue(PASSWORD_OLD);
            newPasswordInput.setValue('');
            confirmPasswordInput.setValue('');
            expect(form.valid).toBeFalsy();
            passwordInput.setValue(PASSWORD_OLD);
            newPasswordInput.setValue(PASSWORD_OK);
            confirmPasswordInput.setValue(PASSWORD_OK);
            expect(form.valid).toBeTruthy();
        });

        it('should test changePassword input validity', () => {
            const passwordInput = component.passwordForm.controls.password;
            const newPasswordInput = component.passwordForm.controls.newPassword;
            const confirmPasswordInput = component.passwordForm.controls.confirmPassword;

            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_CAPITAL);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.valid).toBeTruthy();

            expect(confirmPasswordInput.valid).toBeFalsy();
            passwordInput.setValue(PASSWORD_OLD);
            newPasswordInput.setValue(PASSWORD_OK);
            confirmPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(confirmPasswordInput.valid).toBeFalsy();

            passwordInput.setValue(PASSWORD_OLD);
            newPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            confirmPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(confirmPasswordInput.valid).toBeTruthy();
            expect(component.passwordForm.valid).toBeFalsy();

            passwordInput.setValue('');
            newPasswordInput.setValue(PASSWORD_OK);
            confirmPasswordInput.setValue(PASSWORD_OK);
            expect(confirmPasswordInput.valid).toBeTruthy();
            expect(component.passwordForm.valid).toBeFalsy();

            passwordInput.setValue(PASSWORD_OLD);
            newPasswordInput.setValue(PASSWORD_OK);
            confirmPasswordInput.setValue(PASSWORD_OK);
            expect(confirmPasswordInput.valid).toBeTruthy();
            expect(component.passwordForm.valid).toBeTruthy();
        });

        it('should test changePassword input errors', () => {
            const newPasswordInput = component.passwordForm.controls.newPassword;
            expect(newPasswordInput.errors?.required).toBeTruthy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.errors).toBeNull();
            const confirmPasswordInput = component.passwordForm.controls.confirmPassword;
            confirmPasswordInput.setValue(PASSWORD_OK);
            expect(confirmPasswordInput.errors).toBeNull();
        });
    });

    describe('update', () => {
        it('should not call backend when form is empty', () => {
            spyOn(authenticationService, 'changePassword').and.returnValue(EMPTY);
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue('');
            component.update();
            expect(component.passwordForm.valid).toBeFalsy();
            expect(authenticationService.changePassword).not.toHaveBeenCalled();
        });

        it('should call backend when form is provided', () => {
            component.f.password.setValue(PASSWORD_OLD);
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue(PASSWORD_OK);
            spyOn(authenticationService, 'changePassword').and.returnValue(EMPTY);
            component.update();
            expect(authenticationService.changePassword).toHaveBeenCalled();
        });
    });
});

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangePasswordComponent} from './change-password.component';
import {ToastService} from '@core/services/toast.service';
import {MessageService} from 'primeng/api';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {EMPTY} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {UsersService} from '@api/services/users.service';

describe('ChangePasswordComponent', () => {
    let component: ChangePasswordComponent;
    let fixture: ComponentFixture<ChangePasswordComponent>;
    let toastService: ToastService;
    let userService: UsersService;

    const PASSWORD_OLD = 'Smith1984';
    const PASSWORD_OK = 'Orwell1984';
    const PASSWORD_WITHOUT_CAPITAL = 'orwell1984';
    const PASSWORD_WITHOUT_NUMBER = 'Orwell';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChangePasswordComponent,
                TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [provideAnimations(), provideRouter([]), MessageService, UsersService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        toastService = TestBed.inject(ToastService);
        userService = TestBed.inject(UsersService);
    });

    describe('changePassword form validation', () => {
        it('should render password inputs', () => {
            const compiled = fixture.debugElement.nativeElement;
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

            form.controls.password.setValue(PASSWORD_OLD);
            form.controls.newPassword.setValue(PASSWORD_OK);
            form.controls.confirmPassword.setValue(PASSWORD_OK);
            expect(form.valid).toBeTruthy();
        });

        it('should test newPassword input validity', () => {
            const newPasswordInput = component.passwordForm.controls.newPassword;
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_CAPITAL);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.valid).toBeTruthy();
        });

        it('should test changePassword input errors', () => {
            const newPasswordInput = component.passwordForm.controls.newPassword;
            expect(newPasswordInput.errors?.required).toBeTruthy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.errors).toBeNull();
        });
    });

    describe('update', () => {
        it('should not call backend when form is invalid', () => {
            spyOn(userService, 'updatePassword').and.returnValue(EMPTY);
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue('');
            component.update();
            expect(component.passwordForm.valid).toBeFalsy();
            expect(userService.updatePassword).not.toHaveBeenCalled();
        });

        it('should call backend when form is valid', () => {
            component.f.password.setValue(PASSWORD_OLD);
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue(PASSWORD_OK);
            spyOn(userService, 'updatePassword').and.returnValue(EMPTY);
            component.update();
            expect(userService.updatePassword).toHaveBeenCalled();
        });
    });
});

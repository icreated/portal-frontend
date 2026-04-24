import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UpdatePasswordComponent} from './update-password.component';
import {ToastService} from '@core/services/toast.service';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {EMPTY} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {UsersService} from '@api/services/users.service';

describe('UpdatePasswordComponent', () => {
    let component: UpdatePasswordComponent;
    let fixture: ComponentFixture<UpdatePasswordComponent>;
    let toastService: ToastService;
    let userService: UsersService;

    const PASSWORD_OK = 'Orwell1984';
    const PASSWORD_WITHOUT_CAPITAL = 'orwell1984';
    const PASSWORD_WITHOUT_NUMBER = 'Orwell';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdatePasswordComponent, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
                TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                MessageService,
                UsersService,
                {provide: ActivatedRoute, useValue: {snapshot: {params: {token: ''}}}},
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdatePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        toastService = TestBed.inject(ToastService);
        userService = TestBed.inject(UsersService);
    });

    describe('updatePassword form validation', () => {
        it('should render password inputs', () => {
            const compiled = fixture.debugElement.nativeElement;
            const newPasswordInput = compiled.querySelectorAll('app-password')[0];
            expect(newPasswordInput).toBeTruthy();
            const confirmPasswordInput = compiled.querySelectorAll('app-password')[1];
            expect(confirmPasswordInput).toBeTruthy();
        });

        it('should test updatePassword form validity', () => {
            const form = component.forgotForm;
            expect(form.valid).toBeFalsy();
            form.controls.newPassword.setValue(PASSWORD_OK);
            form.controls.confirmPassword.setValue(PASSWORD_OK);
            expect(form.valid).toBeTruthy();
        });

        it('should test newPassword input validity', () => {
            const newPasswordInput = component.forgotForm.controls.newPassword;
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_CAPITAL);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.valid).toBeTruthy();
        });

        it('should test updatePassword input errors', () => {
            const newPasswordInput = component.forgotForm.controls.newPassword;
            expect(newPasswordInput.errors?.required).toBeTruthy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.errors).toBeNull();
        });
    });

    describe('update', () => {
        it('should not call backend when form is invalid', () => {
            spyOn(userService, 'updateForgottenPassword').and.returnValue(EMPTY);
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue('');
            component.update();
            expect(component.forgotForm.valid).toBeFalsy();
            expect(userService.updateForgottenPassword).not.toHaveBeenCalled();
        });

        it('should call backend when form is valid', () => {
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue(PASSWORD_OK);
            spyOn(userService, 'updateForgottenPassword').and.returnValue(EMPTY);
            component.update();
            expect(userService.updateForgottenPassword).toHaveBeenCalled();
        });
    });
});

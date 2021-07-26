import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {UpdatePasswordComponent} from "./update-password.component";
import {ToastService} from "../../core/services/toast.service";
import {AuthenticationService} from "../../core/services/authentication-service";
import {MessageService} from "primeng/api";
import {AppCommonModule} from "../../app.common.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {EMPTY} from "rxjs";


describe("UpdatePasswordComponent", () => {
    let component: UpdatePasswordComponent;
    let fixture: ComponentFixture<UpdatePasswordComponent>;
    let toastService: ToastService;
    let authenticationService: AuthenticationService;

    const PASSWORD_OK = 'Orwell1984';
    const PASSWORD_WITHOUT_CAPITAL = 'orwell1984';
    const PASSWORD_WITHOUT_NUMBER = 'Orwell';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpdatePasswordComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [MessageService],
            imports: [AppCommonModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
                HttpClientTestingModule, TranslateModule.forRoot()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdatePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        toastService = TestBed.inject(ToastService);
        authenticationService = TestBed.inject(AuthenticationService);
    });

    describe('updatePassword form validation', () => {
        it('should render updatePassword input', () => {
            const compiled = fixture.debugElement.nativeElement;
            const newPasswordInput = compiled.querySelector('input[formControlName="newPassword"]');
            expect(newPasswordInput).toBeTruthy();
            const confirmPasswordInput = compiled.querySelector('input[formControlName="confirmPassword"]');
            expect(confirmPasswordInput).toBeTruthy();
        });

        it('should test updatePassword form validity', () => {
            const form = component.forgotForm;
            expect(form.valid).toBeFalsy();

            const newPasswordInput = form.controls.newPassword;
            const confirmPasswordInput = form.controls.confirmPassword;
            newPasswordInput.setValue('');
            confirmPasswordInput.setValue('');
            expect(form.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_OK);
            confirmPasswordInput.setValue(PASSWORD_OK);
            expect(form.valid).toBeTruthy();
        });

        it('should test updatePassword input validity', () => {
            const newPasswordInput = component.forgotForm.controls.newPassword;
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_WITHOUT_CAPITAL);
            expect(newPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.valid).toBeTruthy();

            const confirmPasswordInput = component.forgotForm.controls.confirmPassword;
            expect(confirmPasswordInput.valid).toBeFalsy();
            newPasswordInput.setValue(PASSWORD_OK);
            confirmPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(confirmPasswordInput.valid).toBeFalsy();

            newPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            confirmPasswordInput.setValue(PASSWORD_WITHOUT_NUMBER);
            expect(confirmPasswordInput.valid).toBeTruthy();
            expect(component.forgotForm.valid).toBeFalsy();

            newPasswordInput.setValue(PASSWORD_OK);
            confirmPasswordInput.setValue(PASSWORD_OK);
            expect(confirmPasswordInput.valid).toBeTruthy();
        });

        it('should test updatePassword input errors', () => {
            const newPasswordInput = component.forgotForm.controls.newPassword;
            expect(newPasswordInput.errors?.required).toBeTruthy();
            newPasswordInput.setValue(PASSWORD_OK);
            expect(newPasswordInput.errors).toBeNull();
            const confirmPasswordInput = component.forgotForm.controls.confirmPassword;
            confirmPasswordInput.setValue(PASSWORD_OK);
            expect(confirmPasswordInput.errors).toBeNull();
        });
    });

    describe('update', () => {
        it('should not call backend when form is empty', () => {
            spyOn(authenticationService, 'passwordValidate').and.returnValue(EMPTY);
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue('');
            component.update()
            expect(component.forgotForm.valid).toBeFalsy();
            expect(authenticationService.passwordValidate).not.toHaveBeenCalled();
        });

        it('should call backend when form is provided', () => {
            component.f.newPassword.setValue(PASSWORD_OK);
            component.f.confirmPassword.setValue(PASSWORD_OK);
            spyOn(authenticationService, 'passwordValidate').and.returnValue(EMPTY);
            component.update()
            expect(authenticationService.passwordValidate).toHaveBeenCalled();
        });
    });
})

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ForgotPasswordComponent} from "./forgot-password.component";
import {ToastService} from "../../core/services/toast.service";
import {AuthenticationService} from "../../core/services/authentication-service";
import {AppCommonModule} from "../../app.common.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EMPTY} from "rxjs";

describe("ForgotPasswordComponent", () => {
    let component: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;
    let toastService: ToastService;
    let authenticationService: AuthenticationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ForgotPasswordComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [MessageService],
            imports: [AppCommonModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
                HttpClientTestingModule, TranslateModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        toastService = TestBed.inject(ToastService);
        authenticationService = TestBed.inject(AuthenticationService);
    });

    describe('email form validation', () => {
        it('should render email input', () => {
            const compiled = fixture.debugElement.nativeElement;
            const emailInput = compiled.querySelector('input[id="email"]');
            expect(emailInput).toBeTruthy();
        });

        it('should test form validity', () => {
            const form = component.forgotForm;
            expect(form.valid).toBeFalsy();
            const emailInput = form.controls.email;
            emailInput.setValue('George Orwell');
            expect(form.valid).toBeFalsy();
            emailInput.setValue('george.orwell@bigbrother-1984.com');
            expect(form.valid).toBeTruthy();
        });

        it('should test input validity', () => {
            const emailInput = component.forgotForm.controls.email;
            expect(emailInput.valid).toBeFalsy();
            emailInput.setValue('george.orwell@bigbrother-1984.com');
            expect(emailInput.valid).toBeTruthy();
        });

        it('should test input errors', () => {
            const emailInput = component.forgotForm.controls.email;
            expect(emailInput.errors?.required).toBeTruthy();
            emailInput.setValue('george.orwell@bigbrother-1984.com');
            expect(emailInput.errors).toBeNull();
        });
    });

    describe('send', () => {
        it('should not call backend if form is empty', () => {
            spyOn(authenticationService, 'forgotPassword').and.returnValue(EMPTY);
            component.f.email.setValue('George Orwell');
            component.send();
            expect(component.forgotForm.valid).toBeFalsy();
            expect(authenticationService.forgotPassword).not.toHaveBeenCalled();
        });

        it('should call backend if email is provided', () => {
            spyOn(authenticationService, 'forgotPassword').and.returnValue(EMPTY);
            component.f.email.setValue('george.orwell@bigbrother-1984.com');
            component.send();
            expect(component.forgotForm.valid).toBeTruthy();
            expect(authenticationService.forgotPassword).toHaveBeenCalled();
        });
    });
})

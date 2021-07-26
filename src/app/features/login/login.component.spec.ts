import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LoginComponent} from "./login.component";
import {ToastService} from "../../core/services/toast.service";
import {AuthenticationService} from "../../core/services/authentication-service";
import {MessageService} from "primeng/api";
import {AppCommonModule} from "../../app.common.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EMPTY} from "rxjs";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toastService: ToastService;
  let authenticationService: AuthenticationService;

  const USERNAME = 'orwell';
  const PASSWORD = 'orwell';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MessageService],
      imports: [AppCommonModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
        HttpClientTestingModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    toastService = TestBed.inject(ToastService);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  describe('login form validation', () => {
    it('should render login input', () => {
      const compiled = fixture.debugElement.nativeElement;
      const usernameInput = compiled.querySelector('input[formControlName="username"]');
      expect(usernameInput).toBeTruthy();
      const passwordInput = compiled.querySelector('input[formControlName="password"]');
      expect(passwordInput).toBeTruthy();
    });

    it('should test form validity', () => {
      const form = component.loginForm;
      expect(form.valid).toBeFalsy();

      const usernameInput = form.controls.username;
      const passwordInput = form.controls.password;
      usernameInput.setValue('');
      passwordInput.setValue('');
      expect(form.valid).toBeFalsy();
      usernameInput.setValue(USERNAME);
      passwordInput.setValue(PASSWORD);
      expect(form.valid).toBeTruthy();
    });

    it('should test input validity', () => {
      const usernameInput = component.loginForm.controls.username;
      expect(usernameInput.valid).toBeFalsy();
      usernameInput.setValue(USERNAME);
      expect(usernameInput.valid).toBeTruthy();

      const passwordInput = component.loginForm.controls.password;
      expect(passwordInput.valid).toBeFalsy();
      passwordInput.setValue(PASSWORD);
      expect(passwordInput.valid).toBeTruthy();
    });

    it('should test input errors', () => {
      const usernameInput = component.loginForm.controls.username;
      expect(usernameInput.errors?.required).toBeTruthy();
      usernameInput.setValue(USERNAME);
      expect(usernameInput.errors).toBeNull();
      const passwordInput = component.loginForm.controls.password;
      expect(passwordInput.errors?.required).toBeTruthy();
      passwordInput.setValue(PASSWORD);
      expect(passwordInput.errors).toBeNull();
    });
  });

  describe('onSubmit', () => {
    it('should not call backend when form is empty', () => {
      spyOn(authenticationService, 'login').and.returnValue(EMPTY);
      component.f.username.setValue(USERNAME);
      component.f.password.setValue('');
      component.onSubmit();
      expect(component.loginForm.valid).toBeFalsy();
      expect(authenticationService.login).not.toHaveBeenCalled();
    });

    it('should call backend when form is provided', () => {
      component.f.username.setValue(USERNAME);
      component.f.password.setValue(PASSWORD);
      spyOn(authenticationService, 'login').and.returnValue(EMPTY);
      component.onSubmit();
      expect(authenticationService.login).toHaveBeenCalled();
    });
  });
})

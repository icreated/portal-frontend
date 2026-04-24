import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgotPasswordComponent} from './forgot-password.component';
import {ToastService} from '@core/services/toast.service';
import {provideRouter} from '@angular/router';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {provideAnimations} from '@angular/platform-browser/animations';
import {EMPTY} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {UsersService} from '@api/services/users.service';

describe('ForgotPasswordComponent', () => {
    let component: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;
    let toastService: ToastService;
    let userService: UsersService;

    const EMAIL_OK = 'george.orwell@bigbrother-1984.com';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ForgotPasswordComponent,
                TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [provideAnimations(), provideRouter([]), MessageService, UsersService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        toastService = TestBed.inject(ToastService);
        userService = TestBed.inject(UsersService);
    });

    it('should render email input', () => {
        const compiled = fixture.debugElement.nativeElement;
        const emailInput = compiled.querySelector('app-input');
        expect(emailInput).toBeTruthy();
    });

    describe('send', () => {
        it('should call backend when email is provided', () => {
            spyOn(userService, 'sendEmailToken').and.returnValue(EMPTY);
            component.f.email.setValue(EMAIL_OK);
            component.send();
            expect(userService.sendEmailToken).toHaveBeenCalled();
        });
    });
});

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PaymentsComponent} from './payments.component';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {PaymentsService} from '@api/services/payments.service';
import {Payment} from '@api/models/payment';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('PaymentsComponent', () => {
    let component: PaymentsComponent;
    let fixture: ComponentFixture<PaymentsComponent>;
    let paymentService: PaymentsService;

    const item1 = {} as Payment;
    const item2 = {} as Payment;
    const paymentItems = [item1, item2];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaymentsComponent, RouterTestingModule.withRoutes([]), TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [PaymentsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        }).compileComponents();

        paymentService = TestBed.inject(PaymentsService);
        spyOn(paymentService, 'getPayments').and.returnValue(of(paymentItems));

        fixture = TestBed.createComponent(PaymentsComponent);
        component = fixture.componentInstance;
    });

    it('should have given number of payments', () => {
        expect(component).toBeTruthy();
        expect(component.payments().length).toBe(2);
    });
});

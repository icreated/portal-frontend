import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PaymentComponent} from './payment.component';
import {RouteStateService} from '@core/services/route-state.service';
import {CommonService} from '@api/services/common.service';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {InvoicesService} from '@api/services/invoices.service';
import {OpenItem} from '@api/models/open-item';
import {PaymentsService} from '@api/services/payments.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('PaymentComponent', () => {
    let component: PaymentComponent;
    let fixture: ComponentFixture<PaymentComponent>;
    let invoiceService: InvoicesService;
    let paymentService: PaymentsService;
    let routeStateService: RouteStateService;
    let commonService: CommonService;
    let router: Router;

    const item1 = {openAmt: 1984} as OpenItem;
    const item2 = {openAmt: 2021} as OpenItem;
    const openItems = [item1, item2];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaymentComponent, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
                TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [InvoicesService, PaymentsService, CommonService,
                provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;

        paymentService = TestBed.inject(PaymentsService);
        invoiceService = TestBed.inject(InvoicesService);
        commonService = TestBed.inject(CommonService);
        router = TestBed.inject(Router);
        routeStateService = TestBed.inject(RouteStateService);
    });

    describe('onInit', () => {
        it('should get given open items list and openItem total', () => {
            spyOn(invoiceService, 'getOpenItems').and.returnValue(of(openItems));
            spyOn(commonService, 'getCreditCardTypes').and.returnValue(of([]));
            component.ngOnInit();
            expect(component).toBeTruthy();
            expect(component.openTotal).toBe(4005);
        });
        it('should get 0 if empty list and navigate to dashboard', () => {
            spyOn(invoiceService, 'getOpenItems').and.returnValue(of([]));
            spyOn(commonService, 'getCreditCardTypes').and.returnValue(of([]));
            spyOn(routeStateService, 'loadPrevious');
            spyOn(router, 'navigate');
            component.ngOnInit();
            expect(component).toBeTruthy();
            expect(component.openTotal).toBe(0);
            expect(routeStateService.loadPrevious).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalled();
        });
    });

    describe('onSubmit', () => {
        it('should check if payment card data are valid', () => {
            component.f.cardType.setValue('C');
            component.f.creditCard.setValue('1984198419841984');
            component.f.holderName.setValue('George Orwell');
            component.f.expirationMonth.setValue('12');
            component.f.expirationYear.setValue('1984');
            component.f.cvc.setValue('198');
            component.onSubmit();
            expect(component.cardFormGroup.valid).toBe(true);
        });
        it('should check if payment card data are invalid without holder name', () => {
            component.f.cardType.setValue('C');
            component.f.creditCard.setValue('1984198419841984');
            component.f.expirationMonth.setValue('12');
            component.f.expirationYear.setValue('1984');
            component.f.cvc.setValue('198');
            component.onSubmit();
            expect(component.cardFormGroup.valid).toBe(false);
        });
    });

    describe('back', () => {
        it('should call RouteStateService to get previous state', () => {
            spyOn(routeStateService, 'loadPrevious');
            component.back();
            expect(routeStateService.loadPrevious).toHaveBeenCalled();
        });
    });
});

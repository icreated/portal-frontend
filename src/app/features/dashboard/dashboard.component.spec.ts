import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {RouteStateService} from '@core/services/route-state.service';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {OpenItem} from '@api/models/open-item';
import {InvoicesService} from '@api/services/invoices.service';
import {PaymentsService} from '@api/services/payments.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';


describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let invoiceService: InvoicesService;
    let paymentService: PaymentsService;
    let routeStateService: RouteStateService;

    const item1 = {openAmt: 1984} as OpenItem;
    const item2 = {openAmt: 2021} as OpenItem;
    const openItems = [item1, item2];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent, RouterTestingModule.withRoutes([]), TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [InvoicesService, PaymentsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        }).compileComponents();

        invoiceService = TestBed.inject(InvoicesService);
        spyOn(invoiceService, 'getOpenItems').and.returnValue(of([]));

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        paymentService = TestBed.inject(PaymentsService);
        routeStateService = TestBed.inject(RouteStateService);
    });

    describe('onInit', () => {
        it('should get given open items list and openItem total', () => {
            (invoiceService.getOpenItems as jasmine.Spy).and.returnValue(of(openItems));
            component.ngOnInit();
            expect(component).toBeTruthy();
            expect(component.openItems.length).toBe(2);
            expect(component.openTotal).toBe(4005);
        });
    });

    describe('goToPayment', () => {
        it('should call RouteStateService', () => {
            spyOn(routeStateService, 'add');
            component.goToPayment();
            expect(routeStateService.add).toHaveBeenCalled();
        });
    });
});

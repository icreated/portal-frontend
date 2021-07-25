import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {RouteStateService} from '../../core/services/route-state.service';
import {of} from 'rxjs';
import {PaymentDataService} from '../payments/payment-data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DashboardDataService} from './dashboard-data.service';
import {OpenItem} from '../../core/models/open-item.model';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let dashboardService: DashboardDataService;
    let paymentService: PaymentDataService;
    let routeStateService: RouteStateService;
    let translateService: TranslateService;

    const item1 = {openAmt: 1984} as OpenItem;
    const item2 = {openAmt: 2021} as OpenItem;
    const openItems = [item1, item2];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [PaymentDataService],
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, TranslateModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dashboardService = TestBed.inject(DashboardDataService);
        paymentService = TestBed.inject(PaymentDataService);
        routeStateService = TestBed.inject(RouteStateService);
        translateService = TestBed.inject(TranslateService);
    });

    describe('onInit', () => {
        it('should get given open items list and openItem total', () => {
            spyOn(dashboardService, 'getOpenItemList').and.returnValue(of(openItems));
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

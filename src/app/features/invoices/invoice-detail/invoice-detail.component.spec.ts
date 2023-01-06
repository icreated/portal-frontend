import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InvoiceDetailComponent} from './invoice-detail.component';
import {RouteStateService} from '../../../core/services/route-state.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {RouteState} from '../../../core/models/route-state.model';
import {AppCommonModule} from '../../../app.common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InvoicesService} from "../../../api/services/invoices.service";
import {Invoice} from "../../../api/models/invoice";

describe('InvoiceDetailComponent', () => {
    let component: InvoiceDetailComponent;
    let fixture: ComponentFixture<InvoiceDetailComponent>;
    let invoiceService: InvoicesService;
    let routeStateService: RouteStateService;

    const invoice = {id: 100, documentNo: 'I100100'} as unknown as Invoice;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InvoiceDetailComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [InvoicesService],
            imports: [AppCommonModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
                HttpClientTestingModule, TranslateModule.forRoot(), PipeModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoiceDetailComponent);
        component = fixture.componentInstance;
        invoiceService = TestBed.inject(InvoicesService);
        routeStateService = TestBed.inject(RouteStateService);

        spyOn(invoiceService, 'getInvoice').and.returnValue(of(invoice));
    });

    describe('onInit', () => {

        it('should call RouteStateService to get invoice Id', () => {
            const routeState = {data: 100} as RouteState;
            spyOn(routeStateService, 'getCurrent').and.returnValue(routeState);
            component.ngOnInit();
            expect(routeStateService.getCurrent).toHaveBeenCalled();
        });
        it('should get invoice by id', () => {
            const routeState = {data: 100} as RouteState;
            spyOn(routeStateService, 'getCurrent').and.returnValue(routeState);
            component.ngOnInit();
            expect(component).toBeTruthy();
            expect(component.invoice).toEqual(invoice);
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

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InvoicesComponent} from './invoices.component';
import {Document} from '@api/models/document';
import {of} from 'rxjs';
import {provideRouter} from '@angular/router';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {RouteStateService} from '@core/services/route-state.service';
import {InvoicesService} from '@api/services/invoices.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('InvoicesComponent', () => {
    let component: InvoicesComponent;
    let fixture: ComponentFixture<InvoicesComponent>;
    let invoiceService: InvoicesService;
    let routeStateService: RouteStateService;

    const item1 = {} as Document;
    const item2 = {} as Document;
    const invoiceItems = [item1, item2];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InvoicesComponent, TranslateModule.forRoot()],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [provideRouter([]), InvoicesService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        }).compileComponents();

        invoiceService = TestBed.inject(InvoicesService);
        spyOn(invoiceService, 'getInvoices').and.returnValue(of(invoiceItems));

        fixture = TestBed.createComponent(InvoicesComponent);
        component = fixture.componentInstance;
        routeStateService = TestBed.inject(RouteStateService);
    });

    it('should have given number of invoices', () => {
        expect(component).toBeTruthy();
        expect(component.invoices().length).toBe(2);
    });

    describe('goToInvoiceLines', () => {
        it('should call RouteStateService', () => {
            spyOn(routeStateService, 'add');
            component.goToInvoiceLines(100);
            expect(routeStateService.add).toHaveBeenCalled();
        });
    });
});

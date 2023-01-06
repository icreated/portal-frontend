import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicesComponent } from './invoices.component';
import {Document} from 'src/app/api/models/document';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {RouteStateService} from '../../core/services/route-state.service';
import {ApplicationStateService} from '../../core/services/application-state.service';
import {InvoicesService} from "../../api/services/invoices.service";

describe('InvoicesComponent', () => {
    let component: InvoicesComponent;
    let fixture: ComponentFixture<InvoicesComponent>;
    let invoiceService: InvoicesService;
    let routeStateService: RouteStateService;
    let state: ApplicationStateService;

    const item1 = {} as Document;
    const item2 = {} as Document;
    const invoiceItems = [item1, item2];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InvoicesComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [InvoicesService],
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, TranslateModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        invoiceService = TestBed.inject(InvoicesService);
        routeStateService = TestBed.inject(RouteStateService);
        state = TestBed.inject(ApplicationStateService);
    });

    describe('onInit', () => {
        it('should have given number of invoices on init', () => {
            spyOn(invoiceService, 'getInvoices').and.returnValue(of(invoiceItems));
            component.ngOnInit();
            expect(component).toBeTruthy();
            expect(component.invoices.length).toBe(2);
        });
    });

    describe('goToInvoiceLines', () => {
        it('should call RouteStateService', () => {
            spyOn(routeStateService, 'add');
            const invoiceId = 100;
            component.goToInvoiceLines(invoiceId);
            expect(routeStateService.add).toHaveBeenCalled();
        });
    });


});

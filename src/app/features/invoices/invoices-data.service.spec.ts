import {TestBed} from '@angular/core/testing';

import {InvoicesDataService} from './invoices-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {DocumentItem} from '../../core/models/document-item.model';
import {Invoice} from '../../core/models/invoice.model';

describe('InvoicesDataService', () => {

    let service: InvoicesDataService;
    let httpMock: HttpTestingController;

    const item1 = {} as DocumentItem;
    const item2 = {} as DocumentItem;
    const invoiceItems = [item1, item2];

    const returnedInvoice = {id: 100, documentNo: 'I100'} as Invoice;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(InvoicesDataService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getInvoicesList', () => {
        it('should return empty list when no invoices', (done: DoneFn) => {
            service.getInvoicesList()
                .subscribe((items) => {
                    expect(items.length).toBe(0);
                    done();
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/invoices`);
            expect(req.request.method).toBe('GET');
            req.flush([]);
        });
        it('should return given number of DocumentItems', (done: DoneFn) => {
            service.getInvoicesList()
                .subscribe((items) => {
                    expect(items.length).toBe(2);
                    done();
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/invoices`);
            expect(req.request.method).toBe('GET');
            req.flush(invoiceItems);
        });
    });

    describe('getInvoice', () => {
        it('should return Invoice by given Id', (done: DoneFn) => {
            const invoiceId = 100;
            service.getInvoiceById(invoiceId)
                .subscribe((item) => {
                    expect(item).toEqual(returnedInvoice);
                    done();
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/invoices/` + invoiceId);
            expect(req.request.method).toBe('GET');
            req.flush(returnedInvoice);
        });
    });
});

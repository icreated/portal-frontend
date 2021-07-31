import {TestBed} from '@angular/core/testing';

import {PaymentDataService} from './payment-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {Payment} from '../../core/models/payment.model';
import {CreditCard} from '../../core/models/credit-card.model';

describe('PaymentDataService', () => {

    let service: PaymentDataService;
    let httpMock: HttpTestingController;

    const item1 = {} as Payment;
    const item2 = {} as Payment;
    const paymentItems = [item1, item2];

    const creditCard = {} as CreditCard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(PaymentDataService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getPaymentsList', () => {
        it('should return given number of Payments', (done: DoneFn) => {
            service.getPaymentsList()
                .subscribe((items) => {
                    expect(items.length).toBe(2);
                    done();
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/payments`);
            expect(req.request.method).toBe('GET');
            req.flush(paymentItems);
        });
    });

    describe('pay', () => {
        it('should pay and return empty body', (done: DoneFn) => {
            service.pay(creditCard)
                .subscribe((result) => {
                    expect(result).toEqual('');
                    done();
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/payments/pay`);
            expect(req.request.method).toBe('POST');
            req.flush('');
        });
    });
});

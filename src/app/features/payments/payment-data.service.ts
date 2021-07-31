import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Payment} from 'src/app/core/models/payment.model';
import {CreditCard} from 'src/app/core/models/credit-card.model';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class PaymentDataService {

    constructor(private http: HttpClient) {
    }

    getPaymentsList(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${environment.apiUrl}/payments`);
    }

    pay(creditCard: CreditCard) {
        return this.http.post(`${environment.apiUrl}/payments/pay`, creditCard);
    }

}


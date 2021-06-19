import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Payment} from 'src/app/core/models/payment.model';
import {OpenItem} from 'src/app/core/models/open-item.model';
import {CreditCard} from 'src/app/core/models/credit-card.model';
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class PaymentDataService {

  openItems: OpenItem[] = [];
  openTotal = 0;

    constructor(private http: HttpClient) { }

    getPaymentsList(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${environment.apiUrl}/payments/all`);
    }

    pay(creditCard: CreditCard) {
        return this.http.post(`${environment.apiUrl}/payments/pay`, creditCard);
    }

}


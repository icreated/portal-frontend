import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from 'src/app/core/models/payment.model';
import { OpenItem } from 'src/app/core/models/open-item.model';
import { CreditCard } from 'src/app/core/models/credit-card.model';


@Injectable({
    providedIn: 'root',
})
export class PaymentDataService {


  openItems: OpenItem[];
  openTotal: number;

    constructor(private http: HttpClient) {
    }

    getPaymentsList() {
        return this.http.get<Payment[]>(`${environment.apiUrl}/payments/all`);
    }


    pay(creditCard: CreditCard) {
        return this.http.post(`${environment.apiUrl}/payments/pay`, creditCard);
    }

    
}


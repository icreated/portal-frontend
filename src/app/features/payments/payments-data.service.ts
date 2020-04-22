import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/core/models/payment.model';


@Injectable({
    providedIn: 'root',
})
export class PaymentsDataService {

    constructor(private http: HttpClient) {
    }

    getPaymentsList() {
        return this.http.get<Payment[]>(`${environment.apiUrl}/payments/all`);
    }
}
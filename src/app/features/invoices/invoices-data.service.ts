import {Injectable} from '@angular/core';
import {DocumentItem} from 'src/app/core/models/document-item.model';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Invoice} from 'src/app/core/models/invoice.model';


@Injectable({
    providedIn: 'root',
})
export class InvoicesDataService {

    constructor(private http: HttpClient) {
    }

    getInvoicesList() {
        return this.http.get<DocumentItem[]>(`${environment.apiUrl}/invoices`);
    }

    getInvoiceById(invoiceId: number) {
        return this.http.get<Invoice>(`${environment.apiUrl}/invoices/` + invoiceId);
    }
}

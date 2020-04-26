import { Injectable } from '@angular/core';
import { DocumentItem } from 'src/app/core/models/document-item.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OpenItem } from 'src/app/core/models/open-item.model';


@Injectable({
    providedIn: 'root',
})
export class DashboardDataService {

    constructor(private http: HttpClient) {
    }

    getOpenItemList() {
        return this.http.get<OpenItem[]>(`${environment.apiUrl}/invoices/openitems`);
    }

}
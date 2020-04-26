import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ValueLabel } from '../models/value-label.model';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    constructor(private http: HttpClient) {
    }

    public getReferenceDocStatus(value: string) {
        return this.http.get<string>(`${environment.apiUrl}/common/reference/docstatus/`+value);
    }

    public getReferenceTenderType(value: string) {
        return this.http.get<string>(`${environment.apiUrl}/common/reference/tendertype/`+value);
    }

    public getReferenceCreditCardTypes() {
        return this.http.get<ValueLabel[]>(`${environment.apiUrl}/common/reference/creditcardtypes`);
    }

}
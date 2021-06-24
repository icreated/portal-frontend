import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ValueLabel} from '../models/value-label.model';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
    providedIn: 'root',
})
export class CommonService {

    constructor(private http: HttpClient, private translationService: TranslateService) {
    }

    public getLang(): string {
        return environment.langMap[this.translationService.currentLang];
    }

    public getReferenceDocStatus(value: string) {
        return this.http.get<string>(`${environment.apiUrl}/common/reference/docstatus/${this.getLang()}/` + value);
    }

    public getReferenceTenderType(value: string) {
        return this.http.get<string>(`${environment.apiUrl}/common/reference/tendertype/${this.getLang()}/` + value);
    }

    public getReferenceCreditCardTypes() {
        return this.http.get<ValueLabel[]>(`${environment.apiUrl}/common/reference/creditcardtypes`);
    }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ValueLabel} from "../../api/models/value-label";



@Injectable({
    providedIn: 'root',
})
export class CommonService {

    constructor(private http: HttpClient, private translationService: TranslateService) {
    }

    public getLang(): string {
        return environment.langMap[this.translationService.currentLang];
    }

    public getReferenceDocStatus(value: string): Observable<string> {
        return this.http.get<string>(`${environment.apiUrl}/common/reference/docstatus/${this.getLang()}/` + value);
    }

    public getReferenceTenderType(value: string): Observable<string> {
        return this.http.get<string>(`${environment.apiUrl}/common/reference/tendertype/${this.getLang()}/` + value);
    }

    public getReferenceCreditCardTypes(): Observable<ValueLabel[]> {
        return this.http.get<ValueLabel[]>(`${environment.apiUrl}/common/reference/creditcardtypes`);
    }

}

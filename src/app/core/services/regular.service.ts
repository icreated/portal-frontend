import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ValueLabel} from "../../api/models/value-label";
import {ToastService} from './toast.service';



@Injectable({
    providedIn: 'root',
})
export class RegularService {



    constructor(private http: HttpClient, private translationService: TranslateService) {

    }

    public getLang(): string {
        return environment.langMap[this.translationService.currentLang];
    }


}

import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class RegularService {

    private translationService = inject(TranslateService);

    public getLang(): string {
        return (environment.langMap as any)[this.translationService.currentLang];
    }

}

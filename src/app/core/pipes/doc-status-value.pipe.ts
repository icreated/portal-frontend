import {inject, Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonService} from '@api/services/common.service';
import {TranslateService} from '@ngx-translate/core';

@Pipe({ name: 'docStatus', standalone: true })
export class DocStatusFormatPipe implements PipeTransform {

  private commonService = inject(CommonService);
  private translate = inject(TranslateService);

  transform(value: any): Observable<string | null> {
    if (value == null) return of(null);
    return this.commonService.getDocStatus({ language: this.translate.currentLang || 'en', value })
      .pipe(map(result => result.label));
  }
}

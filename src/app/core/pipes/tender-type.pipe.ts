import {inject, Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {CommonService} from '@api/services/common.service';
import {TranslateService} from '@ngx-translate/core';

@Pipe({ name: 'tenderType', standalone: true })
export class TenderTypeFormatPipe implements PipeTransform {

  private commonService = inject(CommonService);
  private translate = inject(TranslateService);
  private static cache = new Map<string, Observable<string | null>>();

  transform(value: any): Observable<string | null> {
    if (value == null) return of(null);
    const cache = TenderTypeFormatPipe.cache;
    if (!cache.has(value)) {
      cache.set(value,
        this.commonService.getTenderType({ language: this.translate.currentLang || 'en', value })
          .pipe(map(result => result.label), shareReplay(1))
      );
    }
    return cache.get(value)!;
  }
}

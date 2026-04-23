import {inject, Pipe, PipeTransform} from '@angular/core';
import {CommonService} from '@api/services/common.service';
import {TranslateService} from '@ngx-translate/core';

@Pipe({ name: 'docStatus', pure: false, standalone: true })
export class DocStatusFormatPipe implements PipeTransform {

  private commonService = inject(CommonService);
  private translate = inject(TranslateService);

  private cachedValue: any = null;
  private cachedData: any = null;

  transform(value: any) {
    if (value !== this.cachedValue) {
      this.cachedData = null;
      this.cachedValue = value;
      this.commonService.getDocStatus({ language: this.translate.currentLang || 'en', value })
        .subscribe(result => { this.cachedData = result.label; });
    }
    return this.cachedData;
  }
}

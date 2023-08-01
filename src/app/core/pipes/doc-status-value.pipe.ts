import {Pipe, PipeTransform} from '@angular/core';
import {CommonService} from '../../api/services/common.service';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
    name: 'docStatus',
    pure: false
})
export class DocStatusFormatPipe implements PipeTransform {

  private cachedValue: any = null;
  private cachedData: any = null;

  constructor(private commonService: CommonService, private translate: TranslateService) {
  }

  transform(value: any) {
    if (value !== this.cachedValue) {
      this.cachedData = null;
      this.cachedValue = value;

      this.commonService.getDocStatus({language: this.translate.currentLang, value })
        .subscribe(result => {
          this.cachedData = result.label;
      });
    }
    return this.cachedData;
  }

}

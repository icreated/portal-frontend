import {Pipe, PipeTransform} from '@angular/core';
import {RegularService} from '../services/regular.service';
import {CommonService} from '../../api/services/common.service';
import {TranslateService} from '@ngx-translate/core';


@Pipe({
    name: 'tenderType',
    pure: false
})
export class TenderTypeFormatPipe implements PipeTransform {

  private cachedValue: any = null;
  private cachedData: any = null;


  constructor(private commonService: CommonService, private translate: TranslateService) {
  }

  transform(value: any) {

      if (value !== this.cachedValue) {
          this.cachedData = null;
          this.cachedValue = value;

          this.commonService.getTenderType({language: this.translate.currentLang || 'en', value }).subscribe(result => {
              this.cachedData = result.label;
          });

      }
      return this.cachedData;
  }
}

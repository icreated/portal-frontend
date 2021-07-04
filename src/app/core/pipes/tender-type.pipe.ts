import {Pipe, PipeTransform} from '@angular/core';
import {CommonService} from '../services/common.service';


@Pipe({
    name: 'tenderType',
    pure: false
})
export class TenderTypeFormatPipe implements PipeTransform {

  private cachedValue: any = null;
  private cachedData: any = null;


  constructor(private commonService: CommonService) {
  }

  transform(value: any) {

      if (value !== this.cachedValue) {
          this.cachedData = null;
          this.cachedValue = value;

          this.commonService.getReferenceTenderType(value).subscribe(result => {
              this.cachedData = result;
          });

      }
      return this.cachedData;
  }
}

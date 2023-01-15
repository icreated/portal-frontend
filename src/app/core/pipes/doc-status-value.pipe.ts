import {Pipe, PipeTransform} from '@angular/core';
import {RegularService} from '../services/regular.service';
import {CommonService} from '../../api/services/common.service';

@Pipe({
    name: 'docStatus',
    pure: false
})
export class DocStatusFormatPipe implements PipeTransform {

  private cachedValue: any = null;
  private cachedData: any = null;

  constructor(private commonService: CommonService) {
  }

  transform(value: any) {

      if (value !== this.cachedValue) {
          this.cachedData = null;
          this.cachedValue = value;

          this.commonService.getDocStatus(value).subscribe(result => {
              this.cachedData = result;
          });

      }
      return this.cachedData;
  }

}

import {Pipe, PipeTransform} from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from '../services/common.service';
import { map } from 'rxjs/internal/operators/map';

@Pipe({
  name: 'tenderType',
  pure: false
})
export class TenderTypeFormat implements PipeTransform {

  private cachedValue: any = null;
  private cachedData: any = null;


  constructor(private commonService: CommonService) {}

  transform(value:any) {

    if (value !== this.cachedValue) {
      this.cachedData = null;        
      this.cachedValue = value

      this.commonService.getReferenceTenderType(value).subscribe( result => {
        this.cachedData = result;
      })

    }

    return this.cachedData;
  }
}
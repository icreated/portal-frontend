/**
 * Created by spok on 22/07/16.
 */
import {Pipe, PipeTransform} from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'docStatus',
  pure: false
})
export class DocStatusFormat implements PipeTransform {

  private cachedValue: any = null;
  private cachedData: any = null;


  constructor(private commonService: CommonService) {}

  transform(value:any) {

    if (value !== this.cachedValue) {
      this.cachedData = null;        
      this.cachedValue = value

      this.commonService.getReferenceDocStatus(value).subscribe( result => {
        this.cachedData = result;
      })

    }

    return this.cachedData;
  }

}
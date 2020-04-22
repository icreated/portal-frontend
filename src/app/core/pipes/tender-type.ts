import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tenderType'
})
export class TenderTypeFormat implements PipeTransform {
  transform(value:any) {
    if (value) {
      if (value === 'K') {
        return 'Check';
      } else if (value === 'A') {
        return 'Direct Deposit';
    } else if (value === 'D') {
        return 'Direct Debit';
      } else if (value === 'X') {
        return 'Cash';
      } else if (value === 'T') {
        return 'Account';
      }
    }

    return '';

  }
}

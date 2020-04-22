/**
 * Created by spok on 22/07/16.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'docStatus'
})
export class DocStatusFormat implements PipeTransform {
  transform(value:any) {
    if (value) {
      if (value === 'CO') {
        return 'Completed';
      } else if (value === 'CL') {
        return 'Closed';
      } else if (value === 'VO') {
        return 'Void';
      } else {
        return 'In Progress';
      }
    }
    return 'In Progress';
  }
}

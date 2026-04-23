import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {

  @Input() control = new UntypedFormControl();
  @Input() submitted = false;
  @Input() type = 'input';
  @Input() label = 'Name';
  @Input() icon = undefined;

  // @ts-ignore
  uniqueId = this.constructor['ɵcmp'].id;

}

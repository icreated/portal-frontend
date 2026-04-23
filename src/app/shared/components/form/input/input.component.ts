import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {NgClass} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, InputGroupModule, InputGroupAddonModule, NgClass, TranslateModule],
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

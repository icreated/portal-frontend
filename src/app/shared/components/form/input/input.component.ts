import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
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

  control = input(new FormControl());
  submitted = input(false);
  type = input('input');
  label = input('Name');
  icon = input<string>();

  // @ts-expect-error: accessing internal Angular compiler metadata
  uniqueId = this.constructor['ɵcmp'].id;

}

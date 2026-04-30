import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {DatePickerModule} from 'primeng/datepicker';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {TranslateModule} from '@ngx-translate/core';
import {environment} from '@env/environment';

/**
 * Reusable date picker form field.
 *
 * Usage:
 *   <app-datepicker [control]="f.date" label="Date"
 *                   [submitted]="submitted">
 *   </app-datepicker>
 *
 * The default date format is read from environment.dateFormat (e.g. 'dd/MM/yyyy').
 */
@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, DatePickerModule, InputGroupModule, InputGroupAddonModule, NgClass, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent {

    control    = input(new FormControl());
    submitted  = input(false);
    label      = input('Date');
    dateFormat = input(environment['dateFormat'] ?? 'dd/mm/yy');
    showTime   = input(false);
    icon       = input<string | undefined>(undefined);

    // @ts-expect-error: accessing internal Angular compiler metadata
    uniqueId = this.constructor['ɵcmp'].id;
}

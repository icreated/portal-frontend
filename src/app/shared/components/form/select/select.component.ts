import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {SelectModule} from 'primeng/select';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Reusable select (dropdown) form field.
 *
 * Usage:
 *   <app-select [control]="f.status" [options]="statusOptions"
 *               label="Status" [submitted]="submitted">
 *   </app-select>
 *
 * Options can be plain strings or objects with optionLabel / optionValue.
 */
@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, SelectModule, InputGroupModule, InputGroupAddonModule, NgClass, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

    control     = input(new FormControl());
    submitted   = input(false);
    label       = input('Select');
    placeholder = input('');
    options     = input<any[]>([]);
    optionLabel = input<string | undefined>(undefined);
    optionValue = input<string | undefined>(undefined);
    icon        = input<string | undefined>(undefined);

    // @ts-expect-error: accessing internal Angular compiler metadata
    uniqueId = this.constructor['ɵcmp'].id;
}

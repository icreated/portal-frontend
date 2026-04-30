import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {TextareaModule} from 'primeng/textarea';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Reusable textarea form field.
 *
 * Usage:
 *   <app-textarea [control]="f.notes" label="Notes"
 *                 [rows]="5" [submitted]="submitted">
 *   </app-textarea>
 */
@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, TextareaModule, InputGroupModule, InputGroupAddonModule, NgClass, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {

    control   = input(new FormControl());
    submitted = input(false);
    label     = input('Text');
    rows      = input(3);
    icon      = input<string | undefined>(undefined);

    // @ts-expect-error: accessing internal Angular compiler metadata
    uniqueId = this.constructor['ɵcmp'].id;
}

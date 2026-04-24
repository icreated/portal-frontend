import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input} from '@angular/core';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {DividerModule} from 'primeng/divider';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, PasswordModule, InputGroupModule, InputGroupAddonModule, DividerModule, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordComponent implements AfterViewInit {

  private element = inject(ElementRef);

  control = input(new UntypedFormControl());
  submitted = input(false);
  toggleMask = input(false);
  feedback = input(false);
  label = input('Name');
  icon = input<string>();

  // @ts-expect-error: accessing internal Angular compiler metadata
  uniqueId = this.constructor['ɵcmp'].id;

  ngAfterViewInit(): void {
      const input = this.element.nativeElement.getElementsByTagName('input')[0];
      input.setAttribute('autocomplete', 'password'+this.uniqueId);
  }

  get inputStyle() {
      const classes = this.icon() ? 'input-icon-style password-custom' : 'password-custom';
      return this.submitted() && this.control().errors ? classes +' ng-invalid ng-dirty' : classes;
  }

}

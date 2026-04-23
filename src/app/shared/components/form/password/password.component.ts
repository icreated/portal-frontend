import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordComponent implements AfterViewInit {

  private element = inject(ElementRef);

  @Input() control = new UntypedFormControl();
  @Input() submitted = false;
  @Input() toggleMask = false;
  @Input() feedback = false;
  @Input() label = 'Name';
  @Input() icon = undefined;

  // @ts-ignore
  uniqueId = this.constructor['ɵcmp'].id;

  ngAfterViewInit(): void {
      const input = this.element.nativeElement.getElementsByTagName('input')[0];
      input.setAttribute('autocomplete', 'password'+this.uniqueId);
  }

  get inputStyle() {
      const classes = this.icon ? 'input-icon-style password-custom' : 'password-custom';
      return this.submitted && this.control.errors ? classes +' ng-invalid ng-dirty' : classes;
  }

}

import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit, AfterViewInit {

  @Input() control = new UntypedFormControl();
  @Input() submitted = false;
  @Input() toggleMask = false;
  @Input() feedback = false;
  @Input() label = 'Name';
  @Input() icon = undefined;

  // @ts-ignore
  uniqueId = this.constructor['ɵcmp'].id;
  constructor(private translate: TranslateService, private element: ElementRef) {}

  ngAfterViewInit(): void {
      const input = this.element.nativeElement.getElementsByTagName('input')[0];
      input.setAttribute('autocomplete', 'password'+this.uniqueId);
  }

  ngOnInit(): void {

  }

  get inputStyle() {
      const classes = this.icon ? 'input-icon-style password-custom' : 'password-custom';
      return this.submitted && this.control.errors ? classes +' ng-invalid ng-dirty' : classes;
  }

}

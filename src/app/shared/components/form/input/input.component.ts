import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  @Input() control = new UntypedFormControl();
  @Input() submitted = false;
  @Input() type = 'input';
  @Input() label = 'Name';
  @Input() icon = undefined;

  // @ts-ignore
  uniqueId = this.constructor['ɵcmp'].id;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {

  }

}

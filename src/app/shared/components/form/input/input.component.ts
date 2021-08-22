import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],

})
export class InputComponent implements OnInit {

  @Input() control = new FormControl();
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

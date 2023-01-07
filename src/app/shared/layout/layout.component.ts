import {Component} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
})
export class LayoutComponent {

  css = 'ng-content-docked';

  setCss(css: string) {
    this.css = css;
  }

}

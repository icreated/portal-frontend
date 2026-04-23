import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {

  version = environment.version;

  constructor() {
  }

  ngOnInit() {
  }

}

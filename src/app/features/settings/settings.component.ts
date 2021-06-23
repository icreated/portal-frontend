import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {SessionService} from "../../core/services/session.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selectedLang = 'en';

  constructor(public translate: TranslateService, private sessionService: SessionService) {

    const language = this.sessionService.getItem("ng-prime-language");
    if (language) {
      this.selectedLang = language;
    }
  }

  ngOnInit(): void {
  }

  onChangeLang(event: any) {
    this.translate.use(event.value);
    this.sessionService.setItem("ng-prime-language", event.value);
  }

}

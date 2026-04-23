import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../core/services/session.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  translate = inject(TranslateService);
  private sessionService = inject(SessionService);

  selectedLang = 'en';

  ngOnInit(): void {
      const language = this.sessionService.getItem('ng-prime-language');
      if (language) {
          this.selectedLang = language;
      }
  }

  onChangeLang(event: any) {
      this.translate.use(event.value);
      this.sessionService.setItem('ng-prime-language', event.value);
  }

}

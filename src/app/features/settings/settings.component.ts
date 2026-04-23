import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {PanelModule} from 'primeng/panel';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../core/services/session.service';
import {HeaderBreadcrumbComponent} from '../../shared/layout/header-breadcrumb/header-breadcrumb.component';
import {ThemeChooserComponent} from './theme-chooser/theme-chooser.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    standalone: true,
    imports: [HeaderBreadcrumbComponent, FormsModule, TranslateModule, PanelModule, SelectModule, ThemeChooserComponent, ChangePasswordComponent],
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

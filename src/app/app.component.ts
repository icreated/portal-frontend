import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {LoaderService} from 'src/app/core/services/loader.service';
import {SessionService} from 'src/app/core/services/session.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './core/services/authentication-service';
import {ThemeService} from './core/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = 'Web Portal';
  showLoader: Signal<boolean>;

  constructor(private loaderService: LoaderService, private sessionService: SessionService,
    private authenticationService: AuthenticationService, private themeService: ThemeService,
    translate: TranslateService) {

      this.showLoader = toSignal(this.loaderService.getStatus(), { initialValue: false });

      const theme = this.sessionService.getItem('selected-theme');
      theme ? this.themeService.selectTheme(theme) :
          this.themeService.selectTheme(this.themeService.getThemes()[0]);

      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
      let language = this.sessionService.getItem('ng-prime-language');
      if (language) {
          translate.use(language);
      } else {
          const browserLang = translate.getBrowserLang();
          if (browserLang != null) {
              language = translate.getLangs().includes(browserLang) ? browserLang : 'en';
          }
          this.sessionService.setItem('ng-prime-language', language);
      }
  }

}

import {ChangeDetectionStrategy, Component, inject, OnInit, Signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {LoaderService} from '@core/services/loader.service';
import {SessionService} from '@core/services/session.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '@core/services/authentication-service';
import {ThemeService} from '@core/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    standalone: true,
    imports: [RouterOutlet, ToastModule, ProgressSpinnerModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  title = 'Web Portal';

  private loaderService = inject(LoaderService);
  private sessionService = inject(SessionService);
  private authenticationService = inject(AuthenticationService);
  private themeService = inject(ThemeService);
  private translate = inject(TranslateService);

  showLoader: Signal<boolean> = toSignal(this.loaderService.getStatus(), { initialValue: false });

  ngOnInit() {
      const theme = this.sessionService.getItem('selected-theme');
      theme ? this.themeService.selectTheme(theme) :
          this.themeService.selectTheme(this.themeService.getThemes()[0]);

      this.translate.setDefaultLang('en');
      this.translate.addLangs(['en', 'fr']);
      let language = this.sessionService.getItem('ng-prime-language');
      if (language) {
          this.translate.use(language);
      } else {
          const browserLang = this.translate.getBrowserLang();
          if (browserLang != null) {
              language = this.translate.getLangs().includes(browserLang) ? browserLang : 'en';
          }
          this.sessionService.setItem('ng-prime-language', language);
      }
  }

}

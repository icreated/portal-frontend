import {Component, OnInit} from '@angular/core';
import {LoaderService} from 'src/app/core/services/loader.service';
import {SessionService} from 'src/app/core/services/session.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './core/services/authentication-service';
import {User} from './core/models/user';
import {ThemeService} from './core/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Idempiere Portal';
  showLoader = false;
  theme: string;

  currentUser: User | null = null;

  constructor( private loaderService: LoaderService, private sessionService: SessionService,
    private authenticationService: AuthenticationService, private themeService: ThemeService,
    translate: TranslateService) {

      const theme = this.sessionService.getItem('selected-theme');
      if (theme) {
          this.theme = theme;
          this.themeService.selectTheme(theme);
      } else {
          this.theme = 'theme-teal';
      }

      this.authenticationService.currentUser.subscribe(user => this.currentUser = user);

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
      let language = this.sessionService.getItem('ng-prime-language');
      if (language) {
          // the lang to use, if the lang isn't available, it will use the current loader to get them
          translate.use(language);
      } else {
          const browserLang = translate.getBrowserLang();
          language = translate.getLangs().includes(browserLang) ? browserLang : 'en';
          this.sessionService.setItem('ng-prime-language', language);
      }
  }

  ngOnInit() {
      this.loaderService.getStatus()
          .subscribe((status) => this.showLoader = status);

      this.themeService.getTheme()
          .subscribe((theme) => this.theme = theme);
  }

}

import {Component, OnInit} from '@angular/core';
import {LoaderService} from 'src/app/core/services/loader.service';
import {SessionService} from 'src/app/core/services/session.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './core/services/authentication-service';
import {ThemeService} from './core/services/theme.service';
import {User} from './api/models/user';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
    })
export class AppComponent implements OnInit {

  title = 'Web Portal';
  showLoader = false;

  currentUser: User | null = null;

  constructor( private loaderService: LoaderService, private sessionService: SessionService,
    private authenticationService: AuthenticationService, private themeService: ThemeService,
    translate: TranslateService) {

      const theme = this.sessionService.getItem('selected-theme');
      theme ? this.themeService.selectTheme(theme) :
          this.themeService.selectTheme(this.themeService.getThemes()[0]);

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
          if (browserLang != null) {
              language = translate.getLangs().includes(browserLang) ? browserLang : 'en';
          }
          this.sessionService.setItem('ng-prime-language', language);
      }
  }

  ngOnInit() {
      this.loaderService.getStatus()
          .subscribe((status) => this.showLoader = status);
  }

}

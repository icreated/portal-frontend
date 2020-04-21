import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SessionService } from 'src/app/core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/services/authentication-service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Ng-Prime';
  showLoader: boolean;
  theme = 'theme-light';

  currentUser: User;

  constructor(private loaderService: LoaderService,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService,
    translate: TranslateService) {

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      var language = this.sessionService.getItem("ng-prime-language");
      if (language != null && language.length > 0) {
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(language);
      } else {
        this.sessionService.setItem("ng-prime-language", "en");
      }
  }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) { element.complete(); });
  }
}

// angular default
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Prime NG
import {MessageService} from 'primeng/api';
// app related
import {AppComponent} from 'src/app/app.component';
import {AuthGuard} from 'src/app/core/guards/auth.guard';
import {AppRoutingModule} from 'src/app/app.routing.module';
import {LayoutComponent} from 'src/app/shared/layout/layout.component';
import {MenuComponent} from 'src/app/shared/layout/menu/menu.component';
import {HeaderComponent} from 'src/app/shared/layout/header/header.component';
import {FooterComponent} from 'src/app/shared/layout/footer/footer.component';
import {UserIdleModule} from 'angular-user-idle';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppCommonModule} from 'src/app/app.common.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {JwtInterceptor} from './core/interceptors/jwt-interceptor';
import {ErrorInterceptor} from './core/interceptors/error-interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserIdleModule.forRoot({ idle: 300, timeout: 1}),
    HttpClientModule,
    AppCommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MessageService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


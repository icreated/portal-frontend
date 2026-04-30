import {ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection} from '@angular/core';
import {ApiConfiguration} from '@api/api-configuration';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MessageService, ConfirmationService} from 'primeng/api';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {appRoutes} from './app.routes';
import {jwtInterceptor} from '@core/interceptors/jwt-interceptor';
import {errorInterceptor} from '@core/interceptors/error-interceptor';
import {loadingInterceptor} from '@core/interceptors/loading-interceptor';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor, loadingInterceptor])),
        provideAnimationsAsync(),
        { provide: ApiConfiguration, useValue: { rootUrl: environment.apiUrl } },
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
                    deps: [HttpClient]
                }
            })
        ),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: false } } }),
        MessageService,
        ConfirmationService,
    ]
};

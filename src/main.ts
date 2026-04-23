import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'src/app/app.module';
import { environment } from 'src/environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, { applicationProviders: [provideZonelessChangeDetection()], })
    .catch(err => console.error(err));


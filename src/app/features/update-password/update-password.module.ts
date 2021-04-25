import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePasswordRoutingModule } from './update-password-routing.module';
import { UpdatePasswordComponent } from './update-password.component';
import { AppCommonModule } from 'src/app/app.common.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    CommonModule,
    UpdatePasswordRoutingModule,
    AppCommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [TranslateModule]

})
export class UpdatePasswordModule { }

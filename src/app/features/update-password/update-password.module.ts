import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UpdatePasswordRoutingModule} from './update-password-routing.module';
import {UpdatePasswordComponent} from './update-password.component';
import {AppCommonModule} from 'src/app/app.common.module';

@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    UpdatePasswordRoutingModule,
    AppCommonModule,
  ],
})
export class UpdatePasswordModule { }

import {NgModule} from '@angular/core';

import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {ForgotPasswordComponent} from './forgot-password.component';
import {AppCommonModule} from 'src/app/app.common.module';


@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        ForgotPasswordRoutingModule,
        AppCommonModule,
    ],
})
export class ForgotPasswordModule {
}

import {NgModule} from '@angular/core';
import {LoginComponent} from 'src/app/features/login/login.component';
import {LoginRoutingModule} from 'src/app/features/login/login.routing';
import {AppCommonModule} from 'src/app/app.common.module';


@NgModule({
    imports: [
        LoginRoutingModule,
        AppCommonModule
    ],
    declarations: [LoginComponent],
})
export class LoginModule {
}

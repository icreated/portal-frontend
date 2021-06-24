import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from 'src/app/features/login/login.component';
import {LoginRoutingModule} from 'src/app/features/login/login.routing';
import {AppCommonModule} from 'src/app/app.common.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        AppCommonModule
    ],
    declarations: [LoginComponent],
})
export class LoginModule {
}

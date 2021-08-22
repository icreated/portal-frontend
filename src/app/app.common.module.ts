import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgPrimeModule} from 'src/app/app.ngprime.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorComponent} from './shared/error/error.component';
import {PipeModule} from './core/pipes/pipe.module';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {InputComponent} from './shared/components/form/input/input.component';
import {PasswordComponent} from './shared/components/form/password/password.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PipeModule,
        NgPrimeModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
                deps: [HttpClient]
            },
            isolate: false
        }),
    ],
    exports: [
        NgPrimeModule,
        FormsModule,
        PipeModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        InputComponent,
        PasswordComponent
    ],
    declarations: [
        ErrorComponent, InputComponent, PasswordComponent
    ]
})

export class AppCommonModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: AppCommonModule,
            providers: []
        };
    }
}

import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgPrimeModule} from 'src/app/app.ngprime.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorComponent} from './shared/error/error.component';
import {PipeModule} from './core/pipes/pipe.module';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
    imports: [
        CommonModule,
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
        TranslateModule
    ],
    declarations: [
        ErrorComponent
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

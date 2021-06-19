import { NgModule } from '@angular/core';
import { NgPrimeModule } from 'src/app/app.ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './shared/error/error.component';
import { PipeModule } from './core/pipes/pipe.module';

@NgModule({
    imports: [
    ],
    exports: [
        NgPrimeModule,
        FormsModule,
        PipeModule,
        ReactiveFormsModule
    ],
    declarations: [
        ErrorComponent
    ]
})
export class AppCommonModule {

}

import { NgModule } from '@angular/core';
import { NgPrimeModule } from 'src/app/app.ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMinDirective } from 'src/app/core/validators/custom-min-validator.directive';
import { CustomMaxDirective } from 'src/app/core/validators/custom-max-validator.directive';
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
        CustomMinDirective,
        CustomMaxDirective,
        ErrorComponent
    ]
})
export class AppCommonModule {

}
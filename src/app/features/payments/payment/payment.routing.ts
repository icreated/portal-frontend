import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PaymentComponent} from './payment.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {AppCommonModule} from 'src/app/app.common.module';

const routes: Routes = [
    {
        path: '',
        component: PaymentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        AppCommonModule,
        RxReactiveFormsModule
    ],
    exports: [RouterModule]
})
export class PaymentRoutingModule {
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { PaymentRoutingModule } from './payment.routing';
import { PaymentComponent } from './payment.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule,
    DropdownModule,
  ],
  declarations: [
    PaymentComponent
  ]
})
export class PaymentModule { }
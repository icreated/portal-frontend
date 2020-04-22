import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { PaymentsRoutingModule } from './payments.routing';
import { PaymentsComponent } from './payments.component';


@NgModule({
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    PaymentsComponent
  ]
})
export class PaymentsModule { }
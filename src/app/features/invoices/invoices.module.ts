import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { InvoicesRoutingModule } from 'src/app/features/invoices/invoices.routing';
import { InvoicesComponent } from 'src/app/features/invoices/invoices.component';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    InvoicesComponent
  ]
})
export class InvoicesModule { }
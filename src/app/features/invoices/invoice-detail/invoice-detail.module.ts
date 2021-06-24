import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppCommonModule} from 'src/app/app.common.module';
import {HeaderBreadCrumbModule} from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import {InvoiceDetailRoutingModule} from './invoice-detail.routing';
import {InvoiceDetailComponent} from './invoice-detail.component';

@NgModule({
    imports: [
        CommonModule,
        InvoiceDetailRoutingModule,
        AppCommonModule,
        HeaderBreadCrumbModule
    ],
    declarations: [
        InvoiceDetailComponent
    ]
})
export class InvoiceDetailModule {
}


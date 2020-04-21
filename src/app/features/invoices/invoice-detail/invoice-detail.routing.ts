import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceDetailComponent } from './invoice-detail.component';


const routes: Routes = [
    {
        path: '',
        component: InvoiceDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceDetailRoutingModule { }
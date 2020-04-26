import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoicesDataService } from '../invoices-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: 'invoice-detail.component.html',
  styleUrls: ['invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  env = environment;
  invoice: Invoice = <Invoice>{};

  constructor(
    private invoiceService: InvoicesDataService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    this.invoiceService.getInvoiceById(routeState.data).subscribe(
      data => {
        this.invoice = data;
      })
  }

  back() {
    this.routeStateService.loadPrevious();
  }
}

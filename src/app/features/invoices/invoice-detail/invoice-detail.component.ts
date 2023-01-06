import {Component, OnInit} from '@angular/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {environment} from 'src/environments/environment';
import {InvoicesService} from "../../../api/services/invoices.service";
import {Invoice} from "../../../api/models/invoice";

@Component({
    selector: 'app-invoice-detail',
    templateUrl: 'invoice-detail.component.html',
    styleUrls: ['invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  env = environment;
  invoice: Invoice = {} as Invoice;

  constructor(
    private invoiceService: InvoicesService,
    private routeStateService: RouteStateService) {
  }

  ngOnInit() {
      const routeState = this.routeStateService.getCurrent();
      this.invoiceService.getInvoice({id: routeState.data}).subscribe(
          data => {
              this.invoice = data;
          });
  }

  back() {
      this.routeStateService.loadPrevious();
  }
}

import {Component, OnInit} from '@angular/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {Document} from 'src/app/api/models/document';
import {environment} from 'src/environments/environment';
import {ApplicationStateService} from '../../core/services/application-state.service';
import {InvoicesService} from "../../api/services/invoices.service";

@Component({
    selector: 'app-invoices',
    templateUrl: 'invoices.component.html',
    styleUrls: ['invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  env = environment;
  invoices: Document[] = [];

  constructor(private routeStateService: RouteStateService, private invoiceService: InvoicesService,
              public state: ApplicationStateService) {
  }

  ngOnInit() {
      this.invoiceService.getInvoices().subscribe(
          data => {
              this.invoices = data;
          }
      );
  }

  goToInvoiceLines(invoiceId: number) {
      this.routeStateService.add('invoice-detail', '/main/invoice-detail', invoiceId, false);
  }
}

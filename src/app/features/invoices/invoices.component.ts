import {Component, OnInit} from '@angular/core';
import {InvoicesDataService} from 'src/app/features/invoices/invoices-data.service';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {DocumentItem} from 'src/app/core/models/document-item.model';
import {environment} from 'src/environments/environment';
import {ApplicationStateService} from "../../core/services/application-state.service";

@Component({
  selector: 'app-invoices',
  templateUrl: 'invoices.component.html',
  styleUrls: ['invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  columns: any[];
  env = environment;
  invoices: DocumentItem[];

  constructor(private routeStateService: RouteStateService, private invoiceService: InvoicesDataService,
              public state: ApplicationStateService) { }

  ngOnInit() {
    this.invoiceService.getInvoicesList().subscribe(
      data => {
        this.invoices = data;
      }
    );
  }

  goToInvoiceLines(invoiceId: number) {
    this.routeStateService.add("Invoice Detail", "/main/invoice-detail", invoiceId, false);
  }
}

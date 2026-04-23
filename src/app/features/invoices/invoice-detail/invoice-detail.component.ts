import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {TranslateModule} from '@ngx-translate/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {environment} from 'src/environments/environment';
import {InvoicesService} from "../../../api/services/invoices.service";
import {Invoice} from "../../../api/models/invoice";
import {DocStatusFormatPipe} from '../../../core/pipes/doc-status-value.pipe';
import {HeaderBreadcrumbComponent} from '../../../shared/layout/header-breadcrumb/header-breadcrumb.component';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: 'invoice-detail.component.html',
    styleUrls: ['invoice-detail.component.css'],
    standalone: true,
    imports: [HeaderBreadcrumbComponent, TranslateModule, PanelModule, TableModule, ButtonModule, DocStatusFormatPipe, DatePipe, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceDetailComponent implements OnInit {

  private invoiceService = inject(InvoicesService);
  private routeStateService = inject(RouteStateService);
  private cdr = inject(ChangeDetectorRef);

  env = environment;
  invoice: Invoice = {} as Invoice;

  ngOnInit() {
      const routeState = this.routeStateService.getCurrent();
      this.invoiceService.getInvoice({id: routeState.data}).subscribe(
          data => {
              this.invoice = data;
              this.cdr.markForCheck();
          });
  }

  back() {
      this.routeStateService.loadPrevious();
  }
}

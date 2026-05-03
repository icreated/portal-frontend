import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {TranslateModule} from '@ngx-translate/core';
import {RouteStateService} from '@core/services/route-state.service';
import {Document} from '@api/models/document';
import {environment} from '@env/environment';
import {ApplicationStateService} from '@core/services/application-state.service';
import {InvoicesService} from '@api/services/invoices.service';
import {DocStatusFormatPipe} from '@core/pipes/doc-status-value.pipe';
import {HeaderBreadcrumbComponent} from '@shared/layout/header-breadcrumb/header-breadcrumb.component';

@Component({
    selector: 'app-invoices',
    templateUrl: 'invoices.component.html',
    styleUrls: ['invoices.component.css'],
    standalone: true,
    imports: [HeaderBreadcrumbComponent, TranslateModule, PanelModule, TableModule, DocStatusFormatPipe, AsyncPipe, DatePipe, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesComponent {

  private routeStateService = inject(RouteStateService);
  private invoiceService = inject(InvoicesService);
  state = inject(ApplicationStateService);

  env = environment;
  invoices: Signal<Document[]> = toSignal(this.invoiceService.getInvoices(), { initialValue: [] as Document[] });

  goToInvoiceLines(invoiceId: number) {
      this.routeStateService.add('invoice-detail', '/main/invoice-detail', invoiceId, false);
  }
}

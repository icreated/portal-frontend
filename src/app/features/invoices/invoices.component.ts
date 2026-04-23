import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {Document} from 'src/app/api/models/document';
import {environment} from 'src/environments/environment';
import {ApplicationStateService} from '../../core/services/application-state.service';
import {InvoicesService} from "../../api/services/invoices.service";

@Component({
    selector: 'app-invoices',
    templateUrl: 'invoices.component.html',
    styleUrls: ['invoices.component.css'],
    standalone: false,
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

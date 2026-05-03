import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {TranslateModule} from '@ngx-translate/core';
import {environment} from '@env/environment';
import {Payment} from '@api/models/payment';
import {PaymentsService} from '@api/services/payments.service';
import {DocStatusFormatPipe} from '@core/pipes/doc-status-value.pipe';
import {TenderTypeFormatPipe} from '@core/pipes/tender-type.pipe';
import {HeaderBreadcrumbComponent} from '@shared/layout/header-breadcrumb/header-breadcrumb.component';

@Component({
    selector: 'app-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.css'],
    standalone: true,
    imports: [HeaderBreadcrumbComponent, TranslateModule, PanelModule, TableModule, DocStatusFormatPipe, TenderTypeFormatPipe, AsyncPipe, DatePipe, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent {

  private paymentService = inject(PaymentsService);

  env = environment;
  payments: Signal<Payment[]> = toSignal(this.paymentService.getPayments(), { initialValue: [] as Payment[] });

}

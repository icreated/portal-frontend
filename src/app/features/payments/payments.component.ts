import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {environment} from 'src/environments/environment';
import {Payment} from "../../api/models/payment";
import {PaymentsService} from "../../api/services/payments.service";

@Component({
    selector: 'app-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent {

  env = environment;
  payments: Signal<Payment[]>;

  constructor(private paymentService: PaymentsService) {
    this.payments = toSignal(this.paymentService.getPayments(), { initialValue: [] as Payment[] });
  }

}

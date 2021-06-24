import {Component, OnInit} from '@angular/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {PaymentDataService} from './payment-data.service';
import {Payment} from 'src/app/core/models/payment.model';
import {CommonService} from 'src/app/core/services/common.service';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.css']
})
export class PaymentsComponent implements OnInit {

  env = environment;
  payments: Payment[] = [];

  constructor(
    private routeStateService: RouteStateService,
    private commonService: CommonService,
    private paymentService: PaymentDataService) {
  }

  ngOnInit() {
      this.paymentService.getPaymentsList().subscribe(
          data => {
              this.payments = data;
          }
      );
  }

}

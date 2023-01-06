import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Payment} from "../../api/models/payment";
import {PaymentsService} from "../../api/services/payments.service";

@Component({
    selector: 'app-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.css']
})
export class PaymentsComponent implements OnInit {

  env = environment;
  payments: Payment[] = [];

  constructor(private paymentService: PaymentsService) {
  }

  ngOnInit() {
      this.paymentService.getPayments().subscribe(
          data => {
              this.payments = data;
          }
      );
  }

}

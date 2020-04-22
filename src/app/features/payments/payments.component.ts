import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { PaymentsDataService } from './payments-data.service';
import { Payment } from 'src/app/core/models/payment.model';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.css']
})
export class PaymentsComponent implements OnInit {
  columns: any[];

  payments: Payment[];

  pageSize: number;

  constructor(
    private routeStateService: RouteStateService,
    private commonService: CommonService,
    private paymentService: PaymentsDataService) { }

  ngOnInit() {

    this.pageSize = 10;

    this.paymentService.getPaymentsList().subscribe(
      data => {
        this.payments = data;
      }
    );
  }

}

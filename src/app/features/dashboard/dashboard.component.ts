import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {environment} from 'src/environments/environment';
import {PaymentsService} from "../../api/services/payments.service";
import {OpenItem} from "../../api/models/open-item";
import {InvoicesService} from "../../api/services/invoices.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currencyISO = environment.currencyISO;
  openItems: OpenItem[] = [];
  openTotal = 0;


  msgs: any[];

  constructor(translate: TranslateService,
              private invoicesService: InvoicesService,
              private routeStateService: RouteStateService) {

      this.msgs = [];
      translate.get('welcome-message').subscribe((text: string) => {
          this.msgs.push({severity: 'success', summary: '', detail: text});
      });
  }

  ngOnInit() {
      this.invoicesService.getOpenItems().subscribe(data => {
        if (data) {
          this.openItems = data;
          this.openTotal = data
            .map(item => item.openAmt)
            .reduce((a, b) => a + b, 0);
        }

      });
  }

  goToPayment() {
      this.routeStateService.add('credit-card-payment', '/main/payment', 0, false);
  }

}

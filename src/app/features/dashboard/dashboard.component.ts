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

  barChartData: any;

  doughnutChartData: any;

  msgs: any[];


  constructor(translate: TranslateService,
              private invoicesService: InvoicesService,
              private routeStateService: RouteStateService,
              public paymentService: PaymentsService) {

      this.barChartData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'Rejected',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: 'Approved',
                  backgroundColor: '#9CCC65',
                  borderColor: '#7CB342',
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };

      this.doughnutChartData = {
          labels: ['Active', 'Inactive', 'Deleted'],
          datasets: [
              {
                  data: [300, 50, 100],
                  backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56'
                  ],
                  hoverBackgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56'
                  ]
              }]
      };

      this.msgs = [];
      translate.get('welcome-message').subscribe((text: string) => {
          this.msgs.push({severity: 'success', summary: '', detail: text});
      });
  }

  ngOnInit() {
      this.invoicesService.getOpenItems().subscribe(data => {
          this.openItems = data;
          this.openTotal = data.map(item => item.openAmt).reduce((a, b) => a + b, 0);
      });
  }

  goToPayment() {
      this.routeStateService.add('credit-card-payment', '/main/payment', 0, false);
  }

}

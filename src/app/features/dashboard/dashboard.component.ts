import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {CardModule} from 'primeng/card';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {environment} from 'src/environments/environment';
import {OpenItem} from "../../api/models/open-item";
import {InvoicesService} from "../../api/services/invoices.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    standalone: true,
    imports: [TranslateModule, CardModule, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  private translate = inject(TranslateService);
  private invoicesService = inject(InvoicesService);
  private routeStateService = inject(RouteStateService);
  private cdr = inject(ChangeDetectorRef);

  currencyISO = environment.currencyISO;
  openItems: OpenItem[] = [];
  openTotal = 0;
  msgs: any[] = [];

  ngOnInit() {
      this.translate.get('welcome-message').subscribe((text: string) => {
          this.msgs.push({severity: 'success', summary: '', detail: text});
          this.cdr.markForCheck();
      });
      this.invoicesService.getOpenItems().subscribe(data => {
        if (data) {
          this.openItems = data;
          this.openTotal = data.map(item => item.openAmt).reduce((a, b) => a + b, 0);
        }
        this.cdr.markForCheck();
      });
  }

  goToPayment() {
      this.routeStateService.add('credit-card-payment', '/main/payment', 0, false);
  }

}

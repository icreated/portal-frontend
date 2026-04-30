import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {CardModule} from 'primeng/card';
import {SkeletonModule} from 'primeng/skeleton';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouteStateService} from '@core/services/route-state.service';
import {environment} from '@env/environment';
import {OpenItem} from '@api/models/open-item';
import {InvoicesService} from '@api/services/invoices.service';

interface StatCard {
  titleKey: string;
  value: number | string;
  icon: string;
  iconColor: string;
  bgClass: string;
  routerLink?: string;
  trend?: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    standalone: true,
    imports: [TranslateModule, CardModule, SkeletonModule, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  private translate = inject(TranslateService);
  private invoicesService = inject(InvoicesService);
  private routeStateService = inject(RouteStateService);
  private cdr = inject(ChangeDetectorRef);

  currencyISO = environment.currencyISO;
  openItems: OpenItem[] = [];
  isLoading = signal(true);
  statCards: StatCard[] = [];
  msgs: any[] = [];

  ngOnInit() {
      this.translate.get('welcome-message').subscribe((text: string) => {
          this.msgs.push({severity: 'success', summary: '', detail: text});
          this.cdr.markForCheck();
      });
      this.invoicesService.getOpenItems().subscribe(data => {
        if (data) {
          this.openItems = data;
          this.statCards = [
            {
              titleKey: 'stat-open-balance',
              value: data.map(item => item.openAmt).reduce((a, b) => a + b, 0),
              icon: 'pi pi-wallet',
              iconColor: '#6366f1',
              bgClass: 'stat-indigo',
              routerLink: '/main/invoices'
            }
          ];
        }
        this.isLoading.set(false);
        this.cdr.markForCheck();
      });
  }

  goToPayment() {
      this.routeStateService.add('credit-card-payment', '/main/payment', 0, false);
  }

}

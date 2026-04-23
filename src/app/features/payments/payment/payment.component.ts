import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass} from '@angular/common';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TranslateModule} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {RouteStateService} from '@core/services/route-state.service';
import {environment} from 'src/environments/environment';
import {ValueLabel} from '@api/models/value-label';
import {PaymentsService} from '@api/services/payments.service';
import {CreditCard} from '@api/models/credit-card';
import {InvoicesService} from '@api/services/invoices.service';
import {CommonService} from '@api/services/common.service';
import {HeaderBreadcrumbComponent} from '@shared/layout/header-breadcrumb/header-breadcrumb.component';

@Component({
    selector: 'app-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css'],
    standalone: true,
    imports: [HeaderBreadcrumbComponent, ReactiveFormsModule, TranslateModule, PanelModule, SelectModule, InputTextModule, ButtonModule, NgClass, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit {

  private formBuilder = inject(UntypedFormBuilder);
  paymentService = inject(PaymentsService);
  private invoicesService = inject(InvoicesService);
  private commonService = inject(CommonService);
  private router = inject(Router);
  private routeStateService = inject(RouteStateService);
  private cdr = inject(ChangeDetectorRef);

  env = environment;
  loading = false;
  submitted = false;
  cardFormGroup: UntypedFormGroup = this.formBuilder.group({
      cardType: ['', Validators.required],
      creditCard: ['', [Validators.required, Validators.pattern('^\\d*$')]],
      holderName: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
  });
  openTotal: number = 0;

  creditCardTypes: ValueLabel[] = [];

  months = [
      {label: 'Jan', value: 1},
      {label: 'Feb', value: 2},
      {label: 'Mar', value: 3},
      {label: 'Apr', value: 4},
      {label: 'May', value: 5},
      {label: 'Jun', value: 6},
      {label: 'Jul', value: 7},
      {label: 'Aug', value: 8},
      {label: 'Sep', value: 9},
      {label: 'Oct', value: 10},
      {label: 'Nov', value: 11},
      {label: 'Dec', value: 12},
  ];

  years = [
      {label: '2023', value: 2023},
      {label: '2024', value: 2024},
      {label: '2025', value: 2025},
      {label: '2026', value: 2026},
      {label: '2027', value: 2027},
  ];

  ngOnInit() {
      this.invoicesService.getOpenItems().pipe(
          map(openItems => openItems
              .map(item => item.openAmt)
              .reduce((a, b) => a + b, 0)
          )
      ).subscribe(total => {
          this.openTotal = total;
          this.cdr.markForCheck();
          if (this.openTotal === 0) {
              this.routeStateService.loadPrevious();
              this.router.navigate(['/main/dashboard']);
          }
      });
      this.commonService.getCreditCardTypes().subscribe(data => {
          this.creditCardTypes = data;
          this.cdr.markForCheck();
      });
  }

  get f() {
      return this.cardFormGroup.controls;
  }

  onSubmit() {
      this.submitted = true;
      if (this.cardFormGroup.invalid) {
          return;
      }
      this.loading = true;

      let creditCard = {} as CreditCard;
      creditCard.creditCardType = this.f.cardType.value;
      creditCard.creditCardNumber = this.f.creditCard.value;
      creditCard.creditCardName = this.f.holderName.value;
      creditCard.creditCardExpMM = this.f.expirationMonth.value;
      creditCard.creditCardExpYY = this.f.expirationYear.value;
      creditCard.creditCardVV = this.f.cvc.value;
      creditCard.paymentAmount = this.openTotal;

      this.paymentService.createPayment({body: creditCard}).subscribe(() => {
          this.loading = false;
          creditCard = {} as CreditCard;
          this.cdr.markForCheck();
          this.back();
      });
  }

  back() {
      this.routeStateService.loadPrevious();
  }
}

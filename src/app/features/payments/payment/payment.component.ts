import {Component, OnInit} from '@angular/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonService} from 'src/app/core/services/common.service';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {ValueLabel} from "../../../api/models/value-label";
import {PaymentsService} from "../../../api/services/payments.service";
import {CreditCard} from "../../../api/models/credit-card";
import {InvoicesService} from "../../../api/services/invoices.service";

@Component({
    selector: 'app-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css']
})
export class PaymentComponent implements OnInit {

  env = environment;
  loading = false;
  submitted = false;
  cardFormGroup: UntypedFormGroup;
  openTotal: number | undefined = 0;

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
      {label: '2021', value: 2021},
      {label: '2022', value: 2022},
      {label: '2023', value: 2023},
      {label: '2024', value: 2024},
      {label: '2025', value: 2025},
  ];

  constructor(private formBuilder: UntypedFormBuilder, public paymentService: PaymentsService,
              private invoicesService: InvoicesService, private commonService: CommonService,
              private router: Router, private routeStateService: RouteStateService) {

      this.cardFormGroup = this.formBuilder.group({
          cardType: ['', Validators.required],
          creditCard: ['', [Validators.required, Validators.pattern('^\\d*$')]], // RxwebValidators.creditCard ({fieldName:'cardType'})
          holderName: ['', Validators.required],
          expirationMonth: ['', Validators.required],
          expirationYear: ['', Validators.required],
          cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
      });
  }

  ngOnInit() {
      this.invoicesService.getOpenItems().pipe(
          map(openItems => openItems
              .map(item => item.openAmt)
              .reduce((a, b) => a + b, 0)
          )
      ).subscribe(total => {
          this.openTotal = total;
          if (this.openTotal === 0) {
              this.routeStateService.loadPrevious();
              this.router.navigate(['/main/dashboard']);
          }
      });
      this.commonService.getReferenceCreditCardTypes().subscribe(data => {
          this.creditCardTypes = data;
      });
  }

  // convenience getter for easy access to form fields
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
          // TODO show result message
          this.back();
      });
  }

  back() {
      this.routeStateService.loadPrevious();
  }
}

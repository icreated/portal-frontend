import {Component, OnInit} from '@angular/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {PaymentDataService} from '../payment-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CreditCard} from 'src/app/core/models/credit-card.model';
import {CommonService} from 'src/app/core/services/common.service';
import {ValueLabel} from 'src/app/core/models/value-label.model';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.css']
})
export class PaymentComponent implements OnInit {

  env = environment;
  loading = false;
  submitted = false;
  cardFormGroup: FormGroup;

  creditCardTypes: ValueLabel[] = [];

  months = [
    {label: "Jan", value: 1},
    {label: "Feb", value: 2},
    {label: "Mar", value: 3},
    {label: "Apr", value: 4},
    {label: "May", value: 5},
    {label: "Jun", value: 6},
    {label: "Jul", value: 7},
    {label: "Aug", value: 8},
    {label: "Sep", value: 9},
    {label: "Oct", value: 10},
    {label: "Nov", value: 11},
    {label: "Dec", value: 12},
  ]

  years = [
    {label: "2021", value: 2021},
    {label: "2022", value: 2022},
    {label: "2023", value: 2023},
    {label: "2024", value: 2024},
    {label: "2025", value: 2025},
  ]

  constructor(private formBuilder: FormBuilder, public paymentService: PaymentDataService,
    private commonService: CommonService, private router: Router, private routeStateService: RouteStateService) {

    this.cardFormGroup = this.formBuilder.group({
      cardType:['', Validators.required],
      creditCard:['', [Validators.required, Validators.pattern('^\\d*$')]], // RxwebValidators.creditCard ({fieldName:'cardType'})
      holderName: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit() {
    if (isNaN(this.paymentService.openTotal) || this.paymentService.openTotal <=0) {
      this.routeStateService.loadPrevious();
      this.router.navigate(['/main/dashboard']);
    }
    this.commonService.getReferenceCreditCardTypes().subscribe(data=>{
      this.creditCardTypes = data;
    });
  }

    // convenience getter for easy access to form fields
  get f() { return this.cardFormGroup.controls; }


  onSubmit() {

    this.submitted = true;
    if (this.cardFormGroup.invalid) {
        return;
    }
    this.loading = true;

    let creditCard = <CreditCard>{};
    creditCard.cardType = this.f.cardType.value;
    creditCard.creditCard = this.f.creditCard.value;
    creditCard.holderName = this.f.holderName.value;
    creditCard.expirationMonth = this.f.expirationMonth.value;
    creditCard.expirationYear = this.f.expirationYear.value;
    creditCard.cvc = this.f.cvc.value;
    creditCard.amt = this.paymentService.openTotal;

    this.paymentService.pay(creditCard).subscribe(() => {
      this.loading = false;
      creditCard = <CreditCard>{};
      this.back();
    });
  }

  back() {
    this.routeStateService.loadPrevious();
  }
}

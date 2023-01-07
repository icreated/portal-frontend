import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsComponent } from './payments.component';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {PaymentsService} from "../../api/services/payments.service";
import {Payment} from "../../api/models/payment";

describe('PaymentsComponent', () => {
    let component: PaymentsComponent;
    let fixture: ComponentFixture<PaymentsComponent>;
    let paymentService: PaymentsService;

    const item1 = {} as Payment;
    const item2 = {} as Payment;
    const paymentItems = [item1, item2];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaymentsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [PaymentsService],
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, TranslateModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        paymentService = TestBed.inject(PaymentsService);
    });

    describe('onInit', () => {
        it('should have given number of payments on init', () => {
            spyOn(paymentService, 'getPayments').and.returnValue(of(paymentItems));
            component.ngOnInit();
            expect(component).toBeTruthy();
            expect(component.payments.length).toBe(2);
        });
    });
});

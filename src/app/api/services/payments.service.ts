/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CreditCard } from '../models/credit-card';
import { Payment } from '../models/payment';


/**
 * Operations about payments
 */
@Injectable({
  providedIn: 'root',
})
export class PaymentsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPayments
   */
  static readonly GetPaymentsPath = '/payments';

  /**
   * Get payments.
   *
   * Get user payments
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPayments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPayments$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Payment>>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentsService.GetPaymentsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Payment>>;
      })
    );
  }

  /**
   * Get payments.
   *
   * Get user payments
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPayments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPayments(params?: {
    context?: HttpContext
  }
): Observable<Array<Payment>> {

    return this.getPayments$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Payment>>) => r.body as Array<Payment>)
    );
  }

  /**
   * Path part for operation createPayment
   */
  static readonly CreatePaymentPath = '/payments';

  /**
   * Create payment.
   *
   * Create payment
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPayment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPayment$Response(params: {
    context?: HttpContext

    /**
     * Payment object
     */
    body: CreditCard
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentsService.CreatePaymentPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Create payment.
   *
   * Create payment
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPayment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPayment(params: {
    context?: HttpContext

    /**
     * Payment object
     */
    body: CreditCard
  }
): Observable<void> {

    return this.createPayment$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}

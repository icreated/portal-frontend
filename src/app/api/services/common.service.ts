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

import { ValueLabel } from '../models/value-label';


/**
 * Common operations
 */
@Injectable({
  providedIn: 'root',
})
export class CommonService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDocStatus
   */
  static readonly GetDocStatusPath = '/common/reference/docstatus/{language}/{value}';

  /**
   * Get document status.
   *
   * Get document status
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDocStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDocStatus$Response(params: {

    /**
     * Language
     */
    language: string;

    /**
     * Value
     */
    value: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.GetDocStatusPath, 'get');
    if (params) {
      rb.path('language', params.language, {});
      rb.path('value', params.value, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Get document status.
   *
   * Get document status
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDocStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDocStatus(params: {

    /**
     * Language
     */
    language: string;

    /**
     * Value
     */
    value: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.getDocStatus$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getTenderType
   */
  static readonly GetTenderTypePath = '/common/reference/tendertype/{language}/{value}';

  /**
   * Get tender type.
   *
   * Get tender type
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTenderType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTenderType$Response(params: {

    /**
     * Language
     */
    language: string;

    /**
     * Value
     */
    value: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.GetTenderTypePath, 'get');
    if (params) {
      rb.path('language', params.language, {});
      rb.path('value', params.value, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Get tender type.
   *
   * Get tender type
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTenderType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTenderType(params: {

    /**
     * Language
     */
    language: string;

    /**
     * Value
     */
    value: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.getTenderType$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getCreditCardTypes
   */
  static readonly GetCreditCardTypesPath = '/common/reference/creditcardtypes';

  /**
   * Get credit card types.
   *
   * Get credit card types
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCreditCardTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreditCardTypes$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ValueLabel>>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.GetCreditCardTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ValueLabel>>;
      })
    );
  }

  /**
   * Get credit card types.
   *
   * Get credit card types
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCreditCardTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreditCardTypes(params?: {
    context?: HttpContext
  }
): Observable<Array<ValueLabel>> {

    return this.getCreditCardTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ValueLabel>>) => r.body as Array<ValueLabel>)
    );
  }

}

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

import { Document } from '../models/document';
import { Invoice } from '../models/invoice';
import { OpenItem } from '../models/open-item';


/**
 * Operations about invoices
 */
@Injectable({
  providedIn: 'root',
})
export class InvoicesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getInvoices
   */
  static readonly GetInvoicesPath = '/invoices';

  /**
   * Get invoices.
   *
   * Get user invoices
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInvoices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoices$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Document>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoicesService.GetInvoicesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Document>>;
      })
    );
  }

  /**
   * Get invoices.
   *
   * Get user invoices
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInvoices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoices(params?: {
    context?: HttpContext
  }
): Observable<Array<Document>> {

    return this.getInvoices$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Document>>) => r.body as Array<Document>)
    );
  }

  /**
   * Path part for operation getInvoice
   */
  static readonly GetInvoicePath = '/invoices/{id}';

  /**
   * Get invoice.
   *
   * Get invoice by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInvoice()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoice$Response(params: {

    /**
     * Invoice id
     */
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Invoice>> {

    const rb = new RequestBuilder(this.rootUrl, InvoicesService.GetInvoicePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Invoice>;
      })
    );
  }

  /**
   * Get invoice.
   *
   * Get invoice by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInvoice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoice(params: {

    /**
     * Invoice id
     */
    id: number;
    context?: HttpContext
  }
): Observable<Invoice> {

    return this.getInvoice$Response(params).pipe(
      map((r: StrictHttpResponse<Invoice>) => r.body as Invoice)
    );
  }

  /**
   * Path part for operation getOpenItems
   */
  static readonly GetOpenItemsPath = '/invoices/openitems';

  /**
   * Get open items.
   *
   * Get open items
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOpenItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpenItems$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OpenItem>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoicesService.GetOpenItemsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OpenItem>>;
      })
    );
  }

  /**
   * Get open items.
   *
   * Get open items
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOpenItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOpenItems(params?: {
    context?: HttpContext
  }
): Observable<Array<OpenItem>> {

    return this.getOpenItems$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OpenItem>>) => r.body as Array<OpenItem>)
    );
  }

}

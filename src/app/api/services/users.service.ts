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

import { CommonString } from '../models/common-string';
import { Password } from '../models/password';
import { User } from '../models/user';


/**
 * Operations about users
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation sendEmailLink
   */
  static readonly SendEmailLinkPath = '/users/password/emaillink';

  /**
   * Send email link.
   *
   * Send email link
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendEmailLink()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendEmailLink$Response(params: {
    context?: HttpContext

    /**
     * Token
     */
    body: CommonString
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.SendEmailLinkPath, 'post');
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
   * Send email link.
   *
   * Send email link
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sendEmailLink$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendEmailLink(params: {
    context?: HttpContext

    /**
     * Token
     */
    body: CommonString
  }
): Observable<void> {

    return this.sendEmailLink$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation validateToken
   */
  static readonly ValidateTokenPath = '/users/password/validate';

  /**
   * Validate token.
   *
   * Validate token
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validateToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  validateToken$Response(params: {
    context?: HttpContext

    /**
     * Validate new password
     */
    body: Password
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ValidateTokenPath, 'post');
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
   * Validate token.
   *
   * Validate token
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `validateToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  validateToken(params: {
    context?: HttpContext

    /**
     * Validate new password
     */
    body: Password
  }
): Observable<void> {

    return this.validateToken$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation changePassword
   */
  static readonly ChangePasswordPath = '/users/password/change';

  /**
   * Change password.
   *
   * Change password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: {
    context?: HttpContext

    /**
     * Change password
     */
    body: Password
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ChangePasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Change password.
   *
   * Change password
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: {
    context?: HttpContext

    /**
     * Change password
     */
    body: Password
  }
): Observable<User> {

    return this.changePassword$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

}

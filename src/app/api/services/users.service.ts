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

import { Email } from '../models/email';
import { ForgottenPassword } from '../models/forgotten-password';
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
   * Path part for operation sendEmailToken
   */
  static readonly SendEmailTokenPath = '/users/email/token';

  /**
   * Send email token.
   *
   * Send email with a token to reset password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendEmailToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendEmailToken$Response(params: {
    context?: HttpContext

    /**
     * User mail to send link
     */
    body: Email
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.SendEmailTokenPath, 'post');
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
   * Send email token.
   *
   * Send email with a token to reset password
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sendEmailToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendEmailToken(params: {
    context?: HttpContext

    /**
     * User mail to send link
     */
    body: Email
  }
): Observable<void> {

    return this.sendEmailToken$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateForgottenPassword
   */
  static readonly UpdateForgottenPasswordPath = '/users/password/{token}';

  /**
   * Update forgotten password.
   *
   * Update forgotten password with given token
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateForgottenPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateForgottenPassword$Response(params: {

    /**
     * Token given by email
     */
    token: string;
    context?: HttpContext

    /**
     * Password object
     */
    body: ForgottenPassword
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UpdateForgottenPasswordPath, 'put');
    if (params) {
      rb.path('token', params.token, {});
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
   * Update forgotten password.
   *
   * Update forgotten password with given token
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateForgottenPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateForgottenPassword(params: {

    /**
     * Token given by email
     */
    token: string;
    context?: HttpContext

    /**
     * Password object
     */
    body: ForgottenPassword
  }
): Observable<void> {

    return this.updateForgottenPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updatePassword
   */
  static readonly UpdatePasswordPath = '/users/password';

  /**
   * Update password.
   *
   * Update password of current user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword$Response(params: {
    context?: HttpContext

    /**
     * Password object
     */
    body: Password
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UpdatePasswordPath, 'post');
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
   * Update password.
   *
   * Update password of current user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword(params: {
    context?: HttpContext

    /**
     * Password object
     */
    body: Password
  }
): Observable<User> {

    return this.updatePassword$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

}

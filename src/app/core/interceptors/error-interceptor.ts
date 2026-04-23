import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '@core/services/authentication-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthenticationService);
    return next(req).pipe(
        catchError(err => {
            if (err.status === 401) {
                authService.logout();
            }
            return throwError(() => err.error?.message || err.statusText);
        })
    );
};

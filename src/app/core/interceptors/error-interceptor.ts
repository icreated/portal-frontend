import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '@core/services/authentication-service';
import {ToastService} from '@core/services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthenticationService);
    const toastService = inject(ToastService);
    return next(req).pipe(
        catchError(err => {
            switch (err.status) {
                case 401:
                    authService.logout();
                    break;
                case 403:
                    toastService.addSingle('warn', '', 'error-403', true);
                    break;
                case 404:
                    toastService.addSingle('warn', '', 'error-404', true);
                    break;
                default:
                    if (err.status >= 500) {
                        toastService.addSingle('error', '', 'server-error', true);
                    }
                    break;
            }
            return throwError(() => err.error?.message || err.statusText);
        })
    );
};

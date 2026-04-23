import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {AuthenticationService} from '@core/services/authentication-service';
import {environment} from 'src/environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthenticationService);
    const currentUser = authService.currentUserValue;
    if (currentUser?.token && req.url.startsWith(environment.apiUrl)) {
        req = req.clone({
            setHeaders: { authorization: `Bearer ${currentUser.token}` }
        });
    }
    return next(req);
};

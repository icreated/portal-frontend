import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {LoaderService} from '@core/services/loader.service';

/**
 * Intercepts every HTTP request and toggles the global loading indicator.
 * Uses a counter so concurrent requests don't hide the spinner too early.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loaderService = inject(LoaderService);
    loaderService.show();
    return next(req).pipe(
        finalize(() => loaderService.hide())
    );
};

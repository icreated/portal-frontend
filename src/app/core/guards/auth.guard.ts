import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication-service';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthenticationService);
    if (authService.currentUserValue) {
        return true;
    }
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
};

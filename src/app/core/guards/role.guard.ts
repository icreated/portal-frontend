import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from '@core/services/authentication-service';

/**
 * Role guard — restricts a route to users that have a specific role.
 *
 * Usage in routes:
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [authGuard, roleGuard('ADMIN')]
 *   }
 *
 * The user object returned by the backend must include a `roles` array,
 * e.g. { ..., roles: ['ADMIN', 'USER'] }.
 * If the user is not authenticated or does not have the required role,
 * they are redirected to /error.
 */
export const roleGuard = (requiredRole: string): CanActivateFn => (_route, _state) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    const user = authService.currentUserValue;

    if (user?.roles?.includes(requiredRole)) {
        return true;
    }

    router.navigate(['/error']);
    return false;
};

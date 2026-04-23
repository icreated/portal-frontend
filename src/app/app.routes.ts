import {Routes} from '@angular/router';
import {authGuard} from '@core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./features/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
    },
    {
        path: 'update-password/:token',
        loadComponent: () => import('./features/update-password/update-password.component').then(c => c.UpdatePasswordComponent)
    },
    {
        path: 'main',
        loadComponent: () => import('./shared/layout/layout.component').then(c => c.LayoutComponent),
        children: [
            { path: 'dashboard',      loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent),               canActivate: [authGuard] },
            { path: 'invoices',       loadComponent: () => import('./features/invoices/invoices.component').then(c => c.InvoicesComponent),                   canActivate: [authGuard] },
            { path: 'invoice-detail', loadComponent: () => import('./features/invoices/invoice-detail/invoice-detail.component').then(c => c.InvoiceDetailComponent), canActivate: [authGuard] },
            { path: 'payments',       loadComponent: () => import('./features/payments/payments.component').then(c => c.PaymentsComponent),                   canActivate: [authGuard] },
            { path: 'payment',        loadComponent: () => import('./features/payments/payment/payment.component').then(c => c.PaymentComponent),             canActivate: [authGuard] },
            { path: 'settings',       loadComponent: () => import('./features/settings/settings.component').then(c => c.SettingsComponent),                   canActivate: [authGuard] },
        ]
    },
    {
        path: 'error',
        loadComponent: () => import('./shared/error/error.component').then(c => c.ErrorComponent)
    },
    {
        path: '',
        redirectTo: 'main/dashboard',
        pathMatch: 'full'
    }
];

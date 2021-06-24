import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from 'src/app/core/guards/auth.guard';
import {LayoutComponent} from 'src/app/shared/layout/layout.component';
import {ErrorComponent} from './shared/error/error.component';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('src/app/features/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
    },
    {
        path: 'update-password/:token',
        loadChildren: () => import('src/app/features/update-password/update-password.module').then(m => m.UpdatePasswordModule)
    },

    {
        path: 'main',
        component: LayoutComponent,
        children: [{
            path: 'dashboard',
            loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'invoices',
            loadChildren: () => import('src/app/features/invoices/invoices.module').then(m => m.InvoicesModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'invoice-detail',
            loadChildren: () => import('src/app/features/invoices/invoice-detail/invoice-detail.module').then(m => m.InvoiceDetailModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'payments',
            loadChildren: () => import('src/app/features/payments/payments.module').then(m => m.PaymentsModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'payment',
            loadChildren: () => import('src/app/features/payments/payment/payment.module').then(m => m.PaymentModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'settings',
            loadChildren: () => import('src/app/features/settings/settings.module').then(m => m.SettingsModule),
            canActivate: [AuthGuard]
        },
        ]
    },
    {
        path: 'error',
        component: ErrorComponent,
    // loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import { Routes } from '@angular/router';

export const AUTHENTICATION_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
    }
];

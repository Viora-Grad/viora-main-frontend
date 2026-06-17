import { Routes } from '@angular/router';
import { guestGuard } from '../../core/auth/guards/guest.guard';

export const AUTHENTICATION_ROUTES: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
	},
	{
		path: 'register',
		canActivate: [guestGuard],
		loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
	},
	{
		path: 'callback',
		loadComponent: () => import('./pages/callback/callback.page').then((m) => m.CallbackPage),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login',
	},
];

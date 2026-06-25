import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/guards/auth.guard';
import { noApplicationGuard } from './guards/no-application.guard';

export const ORGANIZATION_ROUTES: Routes = [
	{
		path: 'onboarding',
		canActivate: [authGuard, noApplicationGuard],
		loadComponent: () =>
			import('./pages/onboarding/onboarding.page').then((m) => m.OnboardingPage),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'onboarding',
	},
];

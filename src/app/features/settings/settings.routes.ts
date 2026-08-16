import { Routes } from '@angular/router';
import { SettingsPage } from './pages/settings.pages';
import { hasApplicationGuard } from '../organization/guards/has-application.guard';

export const SETTINGS_ROUTES: Routes = [
	{
		path: '',
		component: SettingsPage,
		children: [
			{
				path: '',
				redirectTo: 'personal-info',
				pathMatch: 'full',
			},
			{
				path: 'personal-info',
				loadComponent: () =>
					import('./components/PersonalInfo/PersonalInfo.component').then(
						(m) => m.PersonalInfoComponent,
					),
			},
			{
				path: 'account-security/change-password',
				loadComponent: () =>
					import('./components/ChangePassword/ChangePassword.component').then(
						(m) => m.ChangePasswordComponent,
					),
			},
			{
				path: 'organization/application',
				canActivate: [hasApplicationGuard],
				loadComponent: () =>
					import('./components/application/application.component').then(
						(m) => m.ApplicationComponent,
					),
			},
			{
				path: 'organization/subscription',
				loadComponent: () =>
					import('./components/subscription/subscription.component').then(
						(m) => m.SubscriptionComponent,
					),
			},
		],
	},
];

import { Routes } from '@angular/router';

export const PRICING_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/pricing.page').then((m) => m.PricingPage),
	},
];

import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'pricing',
		loadChildren: () => import('./features/pricing/pricing.routes').then((m) => m.PRICING_ROUTES),
	},
];

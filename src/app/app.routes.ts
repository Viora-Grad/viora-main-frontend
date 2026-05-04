import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'pricing',
		loadChildren: () => import('./features/pricing/pricing.routes').then((m) => m.PRICING_ROUTES),
  },
		path: 'about',
		loadChildren: () => import('./features/about-us/about-us.routes').then((m) => m.ABOUT_US_ROUTES),
  },
  {
		path: '',
		loadChildren: () => import('./features/landing/landing.routes').then((m) => m.LANDING_ROUTES),
	},
];

import { Routes } from '@angular/router';
export const routes: Routes = [
	{
		path: 'products',
		loadChildren: () =>
			import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
	},
	{
		path: 'contact',
		loadChildren: () => import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
	},
	{
		path: 'pricing',
		loadChildren: () => import('./features/pricing/pricing.routes').then((m) => m.PRICING_ROUTES),
	},
	{
		path: 'about',
		loadChildren: () =>
			import('./features/about-us/about-us.routes').then((m) => m.ABOUT_US_ROUTES),
	},
	{
		path: '',
		loadChildren: () => import('./features/landing/landing.routes').then((m) => m.LANDING_ROUTES),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./features/authentication/authentication.routes').then(
				(m) => m.AUTHENTICATION_ROUTES,
			),
	},
];

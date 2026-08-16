import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/products.pages').then((m) => m.ProductsPage),
	},
];

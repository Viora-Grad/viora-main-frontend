import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '/',
		loadChildren: () =>
			import('./features/about-us/about-us.routes').then((m) => m.ABOUT_US_ROUTES),
	},
];

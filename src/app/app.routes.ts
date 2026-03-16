import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		// TODO: Change this to '/about' when the about us page is ready
		path: '',
		loadChildren: () =>
			import('./features/about-us/about-us.routes').then((m) => m.ABOUT_US_ROUTES),
	},
];

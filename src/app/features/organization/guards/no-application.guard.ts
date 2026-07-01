import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { OrganizationService } from '../services/organization.service';

export const noApplicationGuard: CanActivateFn = () => {
	const organizationService = inject(OrganizationService);
	const router = inject(Router);

	return organizationService.getApplication().pipe(
		map(() => router.parseUrl('/settings/organization/application')),
		catchError((err: { status?: number }) => {
			if (err.status === 404) {
				return of(true);
			}
			return of(router.parseUrl('/'));
		}),
	);
};

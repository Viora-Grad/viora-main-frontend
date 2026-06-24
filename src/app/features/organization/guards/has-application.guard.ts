import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { OrganizationService } from '../services/organization.service';

export const hasApplicationGuard: CanActivateFn = () => {
	const organizationService = inject(OrganizationService);
	const router = inject(Router);

	return organizationService.getApplication().pipe(
		map(() => true),
		catchError((err: { status?: number }) => {
			if (err.status === 404) {
				return of(router.parseUrl('/organization/onboarding'));
			}
			return of(router.parseUrl('/'));
		}),
	);
};

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../../core/models/country.model';
import { OrganizationApi } from '../apis/organization.api';
import { OnboardingRequest } from '../apis/dtos/onboarding-request.dto';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
	private readonly _organizationApi = inject(OrganizationApi);

	public getCountries(): Observable<Country[]> {
		return this._organizationApi.getCountries();
	}

	public getServiceTypes(): Observable<string[]> {
		return this._organizationApi.getServiceTypes();
	}

	public submitOnboarding(request: OnboardingRequest): Observable<void> {
		return this._organizationApi.submitOnboarding(request);
	}

	public checkOrganizationExists(name: string): Observable<boolean> {
		return this._organizationApi.checkOrganizationExists(name);
	}

	public getApplication(): Observable<unknown> {
		return this._organizationApi.getApplication();
	}
}

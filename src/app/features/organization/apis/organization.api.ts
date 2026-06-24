import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Country } from '../../../core/models/country.model';
import { OnboardingRequest } from './dtos/onboarding-request.dto';

@Injectable({ providedIn: 'root' })
export class OrganizationApi {
	private readonly _http = inject(HttpClient);
	private readonly _baseUrl = environment.apiBaseUrl;

	public getCountries(): Observable<Country[]> {
		return this._http.get<Country[]>(`${this._baseUrl}/Countries`);
	}

	public getServiceTypes(): Observable<string[]> {
		return this._http.get<string[]>(`${this._baseUrl}/ServiceTypes`);
	}

	public submitOnboarding(request: OnboardingRequest): Observable<void> {
		return this._http.post<void>(`${this._baseUrl}/Applications`, request);
	}

	public checkOrganizationExists(name: string): Observable<boolean> {
		return this._http.get<boolean>(`${this._baseUrl}/Organizations/exists`, {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			params: { Name: name },
		});
	}

	public getApplication(): Observable<unknown> {
		return this._http.get<unknown>(`${this._baseUrl}/Applications/me`);
	}
}

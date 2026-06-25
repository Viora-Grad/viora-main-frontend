import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Country } from '../../../core/models/country.model';
import { Application } from '../models/application.model';
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

	public getApplication(): Observable<Application> {
		return this._http.get<Application>(`${this._baseUrl}/Applications/me`);
	}

	public uploadDocument(
		applicationId: string,
		documentType: number,
		file: File,
		officialName: string,
		expiryDateUtc: string,
	): Observable<void> {
		const formData = new FormData();
		formData.append('ApplicationId', applicationId);
		formData.append('File', file);
		formData.append('Type', documentType.toString());
		formData.append('OfficialName', officialName);
		formData.append('ExpiryDateUtc', expiryDateUtc);
		return this._http.post<void>(`${this._baseUrl}/LegalPapers`, formData);
	}

	public downloadDocument(documentId: string): Observable<Blob> {
		return this._http.get(`${this._baseUrl}/LegalPapers/${documentId}/file`, {
			responseType: 'blob',
		});
	}
}

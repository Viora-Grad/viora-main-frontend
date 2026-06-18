import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user.model';
import { GoogleLoginRequest } from './dtos/google-login-request.dto';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';
import { RefreshTokenRequest } from './dtos/refresh-token-request.dto';
import { RefreshTokenResponse } from './dtos/refresh-token-response.dto';
import { ValidateEmailRequest } from './dtos/validate-email-request.dto';
import { ValidateEmailResponse } from './dtos/validate-email-response.dto';
import { ValidateGoogleAccountRequest } from './dtos/validate-google-account-request.dto';
import { ValidateGoogleAccountResponse } from './dtos/validate-google-account-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthApi {
	private readonly _http = inject(HttpClient);
	private readonly _baseUrl = environment.apiBaseUrl;

	public login(request: LoginRequest): Observable<LoginResponse> {
		return this._http.post<LoginResponse>(`${this._baseUrl}/auth/login`, request);
	}

	public loginWithGoogle(request: GoogleLoginRequest): Observable<LoginResponse> {
		return this._http.post<LoginResponse>(`${this._baseUrl}/auth/google`, request);
	}

	public refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse> {
		return this._http.post<RefreshTokenResponse>(`${this._baseUrl}/auth/refresh`, request);
	}

	public logout(refreshToken: string): Observable<void> {
		return this._http.post<void>(`${this._baseUrl}/auth/logout`, { refreshToken });
	}

	public getProfile(): Observable<User> {
		return this._http.get<User>(`${this._baseUrl}/auth/me`);
	}

	public validateEmail(request: ValidateEmailRequest): Observable<ValidateEmailResponse> {
		return this._http.post(`${this._baseUrl}/auth/validate/email`, request, {
			responseType: 'text',
		});
	}

	public validateGoogleAccount(
		request: ValidateGoogleAccountRequest,
	): Observable<ValidateGoogleAccountResponse> {
		return this._http.post<ValidateGoogleAccountResponse>(
			`${this._baseUrl}/auth/oauth/google/validate`,
			request,
		);
	}
}

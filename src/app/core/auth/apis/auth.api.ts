import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user.model';
import { GoogleLoginRequest } from './dtos/google-login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';
import { RefreshTokenRequest } from './dtos/refresh-token-request.dto';
import { RefreshTokenResponse } from './dtos/refresh-token-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthApi {
	private readonly _http = inject(HttpClient);
	private readonly _baseUrl = environment.apiBaseUrl;

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
}

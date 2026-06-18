import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user.model';
import { AuthApi } from '../apis/auth.api';
import { AuthStore } from '../store/auth.store';

export const EMAIL_EXISTS_MESSAGE = 'Email Exists for a User';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly _authApi = inject(AuthApi);
	private readonly _authStore = inject(AuthStore);
	private readonly _router = inject(Router);

	public login(email: string, password: string): Observable<void> {
		this._authStore.setLoading();
		return this._authApi.login({ email, password }).pipe(
			tap((response) => {
				this._authStore.setAuthDetails(response.user, response.accessToken, response.refreshToken);
			}),
			switchMap(() => this._fetchProfileAndNavigate()),
		);
	}

	public loginWithGoogle(code: string): Observable<void> {
		this._authStore.setLoading();
		return this._authApi.loginWithGoogle({ code, redirectUri: environment.googleRedirectUri }).pipe(
			tap((response) => {
				this._authStore.setAuthDetails(response.user, response.accessToken, response.refreshToken);
			}),
			switchMap(() => this._fetchProfileAndNavigate()),
		);
	}

	public validateEmail(email: string): Observable<boolean> {
		return this._authApi
			.validateEmail({ email })
			.pipe(map((response) => response === EMAIL_EXISTS_MESSAGE));
	}

	public validateGoogleAccount(code: string): Observable<boolean> {
		return this._authApi
			.validateGoogleAccount({ isCode: true, code, redirectUri: environment.googleRedirectUri })
			.pipe(map((response) => response.isUserExists));
	}

	public refreshTokens(): Observable<void> {
		const refreshToken = this._authStore.refreshToken();
		if (!refreshToken) {
			this.logout();
			return throwError(() => new Error('No refresh token available'));
		}

		return this._authApi.refreshToken({ refreshToken }).pipe(
			map((response) => {
				this._authStore.updateTokens(response.accessToken, response.refreshToken);
			}),
		);
	}

	public fetchProfile(): Observable<void> {
		return this._fetchProfileAndNavigate();
	}

	public logout(): void {
		const refreshToken = this._authStore.refreshToken();
		if (refreshToken) {
			this._authApi.logout(refreshToken).subscribe();
		}
		this._authStore.logout();
		void this._router.navigate(['/auth/login']);
	}

	private _fetchProfileAndNavigate(): Observable<void> {
		return this._authApi.getProfile().pipe(
			map((user: User) => {
				this._authStore.setCurrentUser(user);
				void this._router.navigate(['/']);
			}),
		);
	}
}

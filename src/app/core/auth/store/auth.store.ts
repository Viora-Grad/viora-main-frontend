import { computed } from '@angular/core';
import {
	patchState,
	signalStore,
	withComputed,
	withHooks,
	withMethods,
	withState,
} from '@ngrx/signals';
import { User } from '../../models/user.model';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

interface AuthState {
	currentUser: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isLoading: boolean;
	error: string | null;
	initialized: boolean;
}

const initialState: AuthState = {
	currentUser: null,
	accessToken: null,
	refreshToken: null,
	isLoading: false,
	error: null,
	initialized: false,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),

	withComputed((state) => ({
		isAuthenticated: computed(() => !!state.accessToken()),
	})),

	withMethods((store) => ({
		setAuthDetails(user: User, accessToken: string, refreshToken: string): void {
			localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
			localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
			patchState(store, {
				currentUser: user,
				accessToken,
				refreshToken,
				error: null,
				isLoading: false,
			});
		},
		updateTokens(accessToken: string, refreshToken: string): void {
			localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
			localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
			patchState(store, { accessToken, refreshToken });
		},
		setCurrentUser(user: User): void {
			patchState(store, { currentUser: user });
		},
		setLoading(): void {
			patchState(store, { isLoading: true, error: null });
		},
		setError(error: string): void {
			patchState(store, { error, isLoading: false });
		},
		clearError(): void {
			patchState(store, { error: null });
		},
		logout(): void {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			patchState(store, initialState);
		},
	})),

	withHooks({
		onInit(store) {
			const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
			if (accessToken && refreshToken) {
				patchState(store, { accessToken, refreshToken });
			}
			patchState(store, { initialized: true });
		},
	}),
);

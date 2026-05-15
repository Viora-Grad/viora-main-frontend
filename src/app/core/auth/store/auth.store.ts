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

interface AuthState {
	currentUser: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	currentUser: null,
	accessToken: null,
	refreshToken: null,
	isLoading: false,
	error: null,
};

// TODO:

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),

	withComputed((state) => ({
		isAuthenticated: computed(() => !!state.accessToken()),
	})),

	withMethods((store) => ({
		setAuthDetails(user: User, accessToken: string, refreshToken: string): void {
			localStorage.setItem('access_token', accessToken);
			localStorage.setItem('refresh_token', refreshToken);
			patchState(store, {
				currentUser: user,
				accessToken,
				refreshToken,
				error: null,
				isLoading: false,
			});
		},
		updateTokens(accessToken: string, refreshToken: string): void {
			localStorage.setItem('access_token', accessToken);
			localStorage.setItem('refresh_token', refreshToken);
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
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			patchState(store, initialState);
		},
	})),

	withHooks({
		onInit(store) {
			const accessToken = localStorage.getItem('access_token');
			const refreshToken = localStorage.getItem('refresh_token');
			if (accessToken && refreshToken) {
				patchState(store, { accessToken, refreshToken });
			}
		},
	}),
);

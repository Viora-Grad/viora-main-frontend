import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Gender } from '../../../../../core/models/gender.enum';

export interface RegisterState {
	currentStep: number;
	totalSteps: number;
	isGoogleSignup: boolean;
	googleAuthCode: string | null;
	provider: string | null;
	providerKey: string | null;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: Gender | null;
}

const initialState: RegisterState = {
	currentStep: 1,
	totalSteps: 3,
	isGoogleSignup: false,
	googleAuthCode: null,
	provider: null,
	providerKey: null,
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	dateOfBirth: '',
	gender: null,
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterStore = signalStore(
	withState(initialState),

	withComputed((state) => ({
		progress: computed(() => state.currentStep() / state.totalSteps()),
		effectiveTotalSteps: computed(() => (state.isGoogleSignup() ? 2 : state.totalSteps())),
		isLastStep: computed(() => {
			if (state.isGoogleSignup()) return state.currentStep() === 2;
			return state.currentStep() === state.totalSteps();
		}),
	})),

	withMethods((store) => ({
		setEmail(email: string): void {
			patchState(store, { email });
		},
		setPassword(password: string): void {
			patchState(store, { password });
		},
		setProfileDetails(
			firstName: string,
			lastName: string,
			dateOfBirth: string,
			gender: Gender,
		): void {
			patchState(store, { firstName, lastName, dateOfBirth, gender });
		},
		setGoogleAuthCode(code: string): void {
			patchState(store, { googleAuthCode: code, isGoogleSignup: true });
		},
		setProviderDetails(provider: string, providerKey: string): void {
			patchState(store, { provider, providerKey });
		},
		nextStep(): void {
			const next = Math.min(store.currentStep() + 1, store.totalSteps());
			patchState(store, { currentStep: next });
		},
		prevStep(): void {
			const prev = Math.max(store.currentStep() - 1, 1);
			patchState(store, { currentStep: prev });
		},
		goToStep(step: number): void {
			const clamped = Math.max(1, Math.min(step, store.totalSteps()));
			patchState(store, { currentStep: clamped });
		},
		setGoogleSignup(isGoogle: boolean): void {
			patchState(store, { isGoogleSignup: isGoogle });
		},
		reset(): void {
			patchState(store, initialState);
		},
	})),
);

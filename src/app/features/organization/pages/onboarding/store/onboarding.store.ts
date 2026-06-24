import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ReferralSource } from '../../../../../core/models/referral-source.enum';
import { OnboardingRequest } from '../../../apis/dtos/onboarding-request.dto';

export interface OnboardingState {
	currentStep: number;
	totalSteps: number;
	countryId: string;
	proposedName: string;
	about: string;
	serviceTypes: string[];
	serviceDescription: string;
	letter: string;
	referralSource: ReferralSource;
	billingEmail: string;
	supportEmail: string;
}

const initialState: OnboardingState = {
	currentStep: 1,
	totalSteps: 3,
	countryId: '',
	proposedName: '',
	about: '',
	serviceTypes: [],
	serviceDescription: '',
	letter: '',
	referralSource: ReferralSource.Unknown,
	billingEmail: '',
	supportEmail: '',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OnboardingStore = signalStore(
	withState(initialState),

	withComputed((state) => ({
		progress: computed(() => state.currentStep() / state.totalSteps()),
		isLastStep: computed(() => state.currentStep() === state.totalSteps()),
	})),

	withMethods((store) => ({
		setOrganizationInfo(countryId: string, proposedName: string, about: string): void {
			patchState(store, { countryId, proposedName, about });
		},
		setServices(serviceTypes: string[], serviceDescription: string): void {
			patchState(store, { serviceTypes, serviceDescription });
		},
		setAdditionalInfo(
			letter: string,
			referralSource: ReferralSource,
			billingEmail: string,
			supportEmail: string,
		): void {
			patchState(store, { letter, referralSource, billingEmail, supportEmail });
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
		getOnboardingRequest(): OnboardingRequest {
			return {
				countryId: store.countryId(),
				proposedName: store.proposedName(),
				about: store.about(),
				serviceTypes: store.serviceTypes(),
				serviceDescription: store.serviceDescription(),
				letter: store.letter(),
				referralSource: store.referralSource(),
				billingEmail: store.billingEmail(),
				supportEmail: store.supportEmail(),
			};
		},
		reset(): void {
			patchState(store, initialState);
		},
	})),
);

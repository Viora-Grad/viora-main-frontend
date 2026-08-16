import { ReferralSource } from '../../../../core/models/referral-source.enum';

export interface OnboardingRequest {
	countryId: string;
	proposedName: string;
	about: string;
	serviceDescription: string;
	letter: string;
	serviceTypes: string[];
	referralSource: ReferralSource;
	billingEmail: string;
	supportEmail: string;
}

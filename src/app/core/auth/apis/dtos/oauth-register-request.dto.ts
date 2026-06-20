import { Gender } from '../../../models/gender.enum';

export interface OAuthRegisterRequest {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: Gender;
	email: string;
	providerKey: string;
}

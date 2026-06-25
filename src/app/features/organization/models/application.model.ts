export interface ApplicationMedia {
	id: string;
	contentType: string;
	fileName: string;
	createdAt: string;
}

export interface ApplicationDocument {
	id: string;
	name: string;
	media: ApplicationMedia;
	actionBy: string | null;
	submittedOnUtc: string;
	expiryDateUtc: string;
}

export interface Application {
	id: string;
	ownerId: string;
	ownerName: string;
	name: string;
	about: string;
	letter: string;
	serviceDescription: string;
	servicesProvided: string[];
	submittedOnUtc: string;
	status: string;
	referralSource: string;
	rejectedById: string | null;
	rejectedByName: string | null;
	expiryDateUtc: string;
	billingEmail: string;
	supportEmail: string;
	articleOfAssociation: ApplicationDocument | null;
	commercialRegistration: ApplicationDocument | null;
	registeredAddressProof: ApplicationDocument | null;
	taxCard: ApplicationDocument | null;
}

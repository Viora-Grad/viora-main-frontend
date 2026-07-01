export interface SubscriptionAddon {
	subscriptionAddonId: string;
	value: string;
	price: {
		amount: string;
		currency: string;
	};
}

export interface Subscription {
	id: string;
	planId: string;
	organizationId: string;
	status: string;
	subscriptionStartTime: string;
	subscriptionEndTime: string;
	subscriptionAddonDtos: SubscriptionAddon[];
}

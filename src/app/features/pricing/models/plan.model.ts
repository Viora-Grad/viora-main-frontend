import { Feature } from './feature.model';
import { LimitedFeature } from './limited-feature.model';
import { PlanPeriodTime } from './plan-period-time.enum';
import { Price } from './price.model';

export interface Plan {
	readonly id: string;
	readonly name: string;
	readonly description: string;
	readonly price: Price;
	readonly planPeriodTime: PlanPeriodTime;
	readonly planContent: string;
	readonly limitedFeatures: readonly LimitedFeature[];
	readonly features: readonly Feature[];
}

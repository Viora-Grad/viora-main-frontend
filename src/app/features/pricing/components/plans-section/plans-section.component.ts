import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';

type BillingCycle = 'monthly' | 'semiAnnually' | 'annually';

interface Plan {
	readonly name: string;
	readonly description: string;
	readonly price: string;
	readonly ctaLabel: string;
	readonly benefits: readonly string[];
	readonly featured: boolean;
	readonly customPricing: boolean;
}

@Component({
	selector: 'app-plans-section',
	imports: [FormsModule, ButtonModule, CardModule, SelectButtonModule],
	templateUrl: './plans-section.component.html',
	styleUrl: './plans-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansSectionComponent {
	public readonly title = 'Simple, transparent pricing for every provider';

	public readonly subtitle =
		"Choose the plan that best fits your practice's needs and scale with confidence. No hidden fees, no surprises.";

	public readonly billingCycles = [
		{ label: 'Monthly', value: 'monthly' as BillingCycle },
		{ label: 'Semi-Annually', value: 'semiAnnually' as BillingCycle },
		{ label: 'Annually', value: 'annually' as BillingCycle },
	];

	public selectedBillingCycle: BillingCycle = 'annually';

	public readonly plans: readonly Plan[] = [
		{
			name: 'No Reservation',
			description: 'Perfect for new practitioners getting started with the basics.',
			price: '$0',
			ctaLabel: 'Get Started',
			benefits: ['Basic listing on platform', 'Public professional profile', 'Community support'],
			featured: false,
			customPricing: false,
		},
		{
			name: 'Reservation',
			description: 'Advanced tools for growing medical practices and teams.',
			price: '$49',
			ctaLabel: 'Start 14-Day Free Trial',
			benefits: [
				'Automated scheduling',
				'SMS and Email reminders',
				'Priority 24/7 support',
				'Advanced clinical analytics',
				'Up to 5 staff members',
			],
			featured: true,
			customPricing: false,
		},
		{
			name: 'Enterprise',
			description: 'Custom solutions for large health networks and hospitals.',
			price: 'Custom',
			ctaLabel: 'Book a Demo',
			benefits: [
				'Unlimited clinical branches',
				'Dedicated account manager',
				'White-label patient portal',
				'HIPAA-compliant integrations',
			],
			featured: false,
			customPricing: true,
		},
	];
}

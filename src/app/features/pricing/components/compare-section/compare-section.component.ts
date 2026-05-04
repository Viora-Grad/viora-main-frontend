import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CompareFeature {
	name: string;
	noRes: string | boolean;
	reservation: string | boolean;
	enterprise: string | boolean;
}

@Component({
	selector: 'app-compare-section',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './compare-section.component.html',
	styleUrl: './compare-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareSectionComponent {
	public readonly title = 'Compare all features';
	public readonly subtitle = "Detailed breakdown of what's included in each plan.";

	public readonly features: CompareFeature[] = [
		{
			name: 'Staff limits',
			noRes: '1 User',
			reservation: 'Up to 10',
			enterprise: 'Unlimited',
		},
		{
			name: 'Branch limits',
			noRes: '1 Location',
			reservation: 'Up to 3',
			enterprise: 'Unlimited',
		},
		{
			name: 'SMS Reminders',
			noRes: false,
			reservation: true,
			enterprise: true,
		},
		{
			name: 'Data Analytics',
			noRes: 'Basic',
			reservation: 'Advanced',
			enterprise: 'Custom',
		},
	];

	public readonly planNames = ['No Res', 'Reservation', 'Enterprise'];
}

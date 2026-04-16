import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';

interface PainPoint {
	icon: string;
	title: string;
	description: string;
}

@Component({
	selector: 'app-pain-points-section',
	imports: [CardModule],
	templateUrl: './pain-points-section.component.html',
	styleUrl: './pain-points-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PainPointsSectionComponent {
	public readonly painPoints: PainPoint[] = [
		{
			icon: PrimeIcons.FILE_EDIT,
			title: 'Scattered Records',
			description: 'Stop hunting for patient data across different platforms and paper files.',
		},
		{
			icon: PrimeIcons.CALENDAR_TIMES,
			title: 'Scheduling Errors',
			description: 'Eliminate double bookings and frustrating missed appointments for good.',
		},
		{
			icon: PrimeIcons.INBOX,
			title: 'Inventory Tracking',
			description: 'Manual stock counting is a thing of the past. Know what you have instantly.',
		},
		{
			icon: PrimeIcons.TH_LARGE,
			title: 'Multiple Tools',
			description: 'No more logging into 5 different apps just to start your workday.',
		},
	];

	public readonly title = "Clinic Management Shouldn't Be This Complicated";
	public readonly description = 'Stop fighting your tools and start focusing on your patients.';
}

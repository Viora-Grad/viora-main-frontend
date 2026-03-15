import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';

type PlatformFeature = {
	icon: string;
	title: string;
	description: string;
};

@Component({
	selector: 'app-platform-features-section',
	imports: [AvatarModule],
	templateUrl: './platform-features-section.component.html',
	styleUrl: './platform-features-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformFeaturesSectionComponent {
	public readonly title = 'Everything Your Clinic Needs in One Platform';

	public readonly features: PlatformFeature[] = [
		{
			icon: PrimeIcons.USERS,
			title: 'Patient Records',
			description: 'Comprehensive digital health records with history, files, and easy search.',
		},
		{
			icon: PrimeIcons.CALENDAR,
			title: 'Appointment Scheduling',
			description: 'Intuitive drag-and-drop calendar for staff and online booking for patients.',
		},
		{
			icon: PrimeIcons.SAVE,
			title: 'Smart Archive',
			description: 'Secure cloud storage for all diagnostic images, reports, and consents.',
		},
		{
			icon: PrimeIcons.ID_CARD,
			title: 'Staff Management',
			description: 'Manage shifts, roles, and performance metrics in a centralized view.',
		},
		{
			icon: PrimeIcons.BOX,
			title: 'Inventory Management',
			description: 'Automated low-stock alerts and integrated supplier ordering systems.',
		},
		{
			icon: PrimeIcons.SPARKLES,
			title: 'AI Marketing Tools',
			description: 'Generate content, manage reviews, and run targeted patient campaigns.',
		},
	];
}

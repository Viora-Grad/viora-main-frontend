import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

interface SetupStep {
	step: string;
	title: string;
	description: string;
}

@Component({
	selector: 'app-setup-steps-section',
	imports: [AvatarModule],
	templateUrl: './setup-steps-section.component.html',
	styleUrl: './setup-steps-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupStepsSectionComponent {
	public readonly title = 'Simple Setup, Powerful Results';

	public readonly steps: SetupStep[] = [
		{
			step: '1',
			title: 'Setup Profile',
			description: 'Configure your clinic details, hours, and branding in minutes.',
		},
		{
			step: '2',
			title: 'Add Records',
			description: 'Import existing patient data and onboard your medical staff.',
		},
		{
			step: '3',
			title: 'Manage Operations',
			description: 'Start booking appointments and tracking supply usage.',
		},
		{
			step: '4',
			title: 'Grow with AI',
			description: 'Launch automated marketing to attract and retain more patients.',
		},
	];
}

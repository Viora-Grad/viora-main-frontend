import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

type Tag = {
	icon: string;
	label: string;
	severity: 'info' | 'success' | 'warn' | 'error' | 'secondary' | 'contrast';
};

@Component({
	selector: 'app-hero-section',
	imports: [ButtonModule, MessageModule],
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
	public readonly tags: Tag[] = [
		{
			icon: PrimeIcons.MICROCHIP_AI,
			label: 'AI-Powered',
			severity: 'info',
		},
	];
	public readonly title = 'Seamless Comfort. True Efficiency.';
	public readonly description =
		'Viora brings patient records, scheduling, staff management, inventory tracking, and clinic marketing together in a single healthcare CRM designed for efficiency and growth.';
}

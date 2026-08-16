import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';

interface PurposeCard {
	readonly icon: string;
	readonly title: string;
	readonly description: string;
}

@Component({
	selector: 'app-purpose-section',
	imports: [CardModule],
	templateUrl: './purpose-section.component.html',
	styleUrl: './purpose-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurposeSectionComponent {
	public readonly title = 'Built to Bring Order to Wellness & Healthcare Services';

	public readonly description =
		'Viora is a digital appointment platform designed to help providers move away from manual scheduling. We empower clinics, wellness centers, and independent practitioners with the structure they need to focus on what matters most: their patients.';

	public readonly cards: PurposeCard[] = [
		{
			icon: PrimeIcons.COMPASS,
			title: 'Our Mission',
			description:
				'To simplify how people access healthcare and wellness services by removing the friction of scheduling and administrative chaos. We believe technology should be the silent engine behind every successful appointment.',
		},
		{
			icon: PrimeIcons.EYE,
			title: 'Our Vision',
			description:
				'To become the trusted digital foundation for the entire wellness ecosystem, enabling a world where providers can scale their impact without increasing their manual workload.',
		},
	];
}

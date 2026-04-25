import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';

interface Principle {
	readonly icon: string;
	readonly title: string;
	readonly description: string;
}

@Component({
	selector: 'app-principles-section',
	imports: [CardModule],
	templateUrl: './principles-section.component.html',
	styleUrl: './principles-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrinciplesSectionComponent {
	public readonly title = 'What We Believe In';

	public readonly subtitle = 'The core principles that guide our every decision.';

	public readonly principles: Principle[] = [
		{
			icon: PrimeIcons.FILTER,
			title: 'Clarity Over Chaos',
			description:
				'We strive to distill complex healthcare operations into clean, manageable views that empower quick action.',
		},
		{
			icon: PrimeIcons.PENCIL,
			title: 'Simplicity by Design',
			description:
				"Powerful software shouldn't be hard to use. We prioritize intuitive interfaces that feel natural from day one.",
		},
		{
			icon: PrimeIcons.SHIELD,
			title: 'Reliability & Trust',
			description:
				"In healthcare, downtime isn't an option. We build for 99.9% uptime and enterprise-grade data security.",
		},
		{
			icon: PrimeIcons.HEART,
			title: 'Empathy for Real Workflows',
			description:
				'We listen to providers to understand the nuances of their daily routines, ensuring our tools solve real problems.',
		},
		{
			icon: PrimeIcons.CHART_LINE,
			title: 'Efficiency That Improves Service Quality',
			description:
				"Automation isn't just about saving time; it's about freeing you up to provide better care.",
		},
		{
			icon: PrimeIcons.CLOCK,
			title: 'Continuous Improvement',
			description:
				'The healthcare landscape is always evolving, and so is Viora. We ship updates weekly to stay ahead.',
		},
	];
}

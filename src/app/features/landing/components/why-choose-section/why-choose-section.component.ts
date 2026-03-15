import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';

interface WhyChooseItem {
	icon: string;
	title: string;
	description: string;
	badgeClass: string;
}

@Component({
	selector: 'app-why-choose-section',
	imports: [AvatarModule],
	templateUrl: './why-choose-section.component.html',
	styleUrl: './why-choose-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyChooseSectionComponent {
	public readonly title = 'Why Clinics Choose Viora';

	public readonly items: WhyChooseItem[] = [
		{
			icon: PrimeIcons.STOPWATCH,
			title: 'Save Time',
			description: 'Reduce administrative tasks by up to 40% every week.',
			badgeClass: '!bg-emerald-100 !text-emerald-700',
		},
		{
			icon: PrimeIcons.HEART,
			title: 'Patient Experience',
			description: 'Give patients the modern digital experience they expect.',
			badgeClass: '!bg-blue-100 !text-blue-700',
		},
		{
			icon: PrimeIcons.VERIFIED,
			title: 'Reduce Errors',
			description: 'Integrated data means no more manual transcription mistakes.',
			badgeClass: '!bg-amber-100 !text-amber-700',
		},
		{
			icon: PrimeIcons.CHART_LINE,
			title: 'Grow Clinic',
			description: 'Smart insights and marketing to scale your practice sustainably.',
			badgeClass: '!bg-purple-100 !text-purple-700',
		},
	];
}

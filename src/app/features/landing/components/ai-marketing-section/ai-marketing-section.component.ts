import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

type MarketingPoint = {
	icon: string;
	label: string;
};

@Component({
	selector: 'app-ai-marketing-section',
	imports: [AvatarModule, ButtonModule, TagModule, NgOptimizedImage],
	templateUrl: './ai-marketing-section.component.html',
	styleUrl: './ai-marketing-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiMarketingSectionComponent {
	private readonly aiName = 'ViVi';

	public readonly title = `Meet ${this.aiName} — Your AI Marketing Assistant for Clinics`;

	public readonly description = `Let ${this.aiName} handle your growth while you focus on care. ${this.aiName} writes, schedules, and optimizes your clinic's presence across the web.`;

	public readonly featureTag = 'New Feature';

	public readonly points: MarketingPoint[] = [
		{
			icon: PrimeIcons.CHECK_CIRCLE,
			label: 'AI-Generated Social Media Posts',
		},
		{
			icon: PrimeIcons.CHECK_CIRCLE,
			label: 'Multi-Platform Posting',
		},
		{
			icon: PrimeIcons.CHECK_CIRCLE,
			label: 'Auto-Scheduling for Social Media',
		},
	];
}

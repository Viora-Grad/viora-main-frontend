import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';

@Component({
	selector: 'app-landing-page',
	imports: [HeroSectionComponent],
	templateUrl: './landing.page.html',
	styleUrl: './landing.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
	public readonly heroTitle = 'Seamless Comfort. True Efficiency.';
	public readonly heroDescription =
		'Viora brings patient records, scheduling, staff management, inventory tracking, and clinic marketing together in a single healthcare CRM designed for efficiency and growth.';
	public readonly heroCtaLabel = 'Get Started';
	public readonly heroSecondaryCtaLabel = 'See Pricing';
	public readonly heroVideoSrc = '/videos/preview.mp4';
}

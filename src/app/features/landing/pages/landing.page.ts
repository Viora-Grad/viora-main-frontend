import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AiMarketingSectionComponent } from '../components/ai-marketing-section/ai-marketing-section.component';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { PainPointsSectionComponent } from '../components/pain-points-section/pain-points-section.component';
import { PlatformFeaturesSectionComponent } from '../components/platform-features-section/platform-features-section.component';
import { SetupStepsSectionComponent } from '../components/setup-steps-section/setup-steps-section.component';
import { WhyChooseSectionComponent } from '../components/why-choose-section/why-choose-section.component';

@Component({
	selector: 'app-landing-page',
	imports: [
		HeroSectionComponent,
		PainPointsSectionComponent,
		PlatformFeaturesSectionComponent,
		SetupStepsSectionComponent,
		AiMarketingSectionComponent,
		WhyChooseSectionComponent,
	],
	templateUrl: './landing.page.html',
	styleUrl: './landing.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {}

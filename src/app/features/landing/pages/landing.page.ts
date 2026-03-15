import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';

@Component({
	selector: 'app-landing-page',
	imports: [HeroSectionComponent],
	templateUrl: './landing.page.html',
	styleUrl: './landing.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {}

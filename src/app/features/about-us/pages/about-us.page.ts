import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CtaSectionComponent } from '../components/cta-section/cta-section.component';
import { PrinciplesSectionComponent } from '../components/principles-section/principles-section.component';
import { PurposeSectionComponent } from '../components/purpose-section/purpose-section.component';
import { StorySectionComponent } from '../components/story-section/story-section.component';

@Component({
	selector: 'app-about-us-page',
	imports: [
		PurposeSectionComponent,
		StorySectionComponent,
		PrinciplesSectionComponent,
		CtaSectionComponent,
	],
	templateUrl: './about-us.page.html',
	styleUrl: './about-us.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPage {}

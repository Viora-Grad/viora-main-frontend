import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PurposeSectionComponent } from '../components/purpose-section/purpose-section.component';
import { StorySectionComponent } from '../components/story-section/story-section.component';

@Component({
	selector: 'app-about-us-page',
	imports: [PurposeSectionComponent, StorySectionComponent],
	templateUrl: './about-us.page.html',
	styleUrl: './about-us.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPage {}

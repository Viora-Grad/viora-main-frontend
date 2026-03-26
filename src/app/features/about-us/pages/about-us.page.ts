import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PurposeSectionComponent } from '../components/purpose-section/purpose-section.component';

@Component({
	selector: 'app-about-us-page',
	imports: [PurposeSectionComponent],
	templateUrl: './about-us.page.html',
	styleUrl: './about-us.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPage {}

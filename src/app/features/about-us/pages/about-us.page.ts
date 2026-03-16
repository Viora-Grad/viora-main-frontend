import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-about-us-page',
	templateUrl: './about-us.page.html',
	styleUrl: './about-us.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPage {}

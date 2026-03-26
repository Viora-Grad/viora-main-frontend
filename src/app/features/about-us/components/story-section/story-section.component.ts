import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-story-section',
	templateUrl: './story-section.component.html',
	styleUrl: './story-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorySectionComponent {
	public readonly title = 'Why Viora Was Created';

	public readonly paragraphs: string[] = [
		'Viora was born from a simple observation: the wellness industry was being held back by paper calendars, fragmented emails, and constant back-and-forth logistics than treating patients.',
		"The frustration was mutual. Patients struggled to find available slots, and providers were burning out from the sheer weight of manual coordination. We realized that the industry didn't just need another calendar tool—it needed a comprehensive platform designed specifically for the unique workflows of health and wellness.",
		"We built Viora to bring structure to the chaos. By combining intuitive scheduling with powerful automation and HIPAA-compliant communication, we've created a home for modern practices to thrive in a digital-first world.",
	];
}

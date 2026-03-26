import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-cta-section',
	imports: [ButtonModule],
	templateUrl: './cta-section.component.html',
	styleUrl: './cta-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSectionComponent {
	public readonly heading =
		'Viora is committed to helping providers transition toward well-organized, digital-first service environments.';

	public readonly primaryButtonLabel = 'Get Started';

	public readonly secondaryButtonLabel = 'See How Viora Works';
}

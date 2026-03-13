import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	input,
	viewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'app-hero-section',
	imports: [ButtonModule, MessageModule],
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
	public readonly title = input('Landing Hero Title');
	public readonly description = input('Landing hero supporting text goes here.');
	public readonly ctaLabel = input('Get Started');
	public readonly secondaryCtaLabel = input('See Pricing');
	public readonly videoSrc = input('/videos/preview.mp4');

	private readonly _videoRef = viewChild<ElementRef<HTMLVideoElement>>('heroVideo');
	private readonly _destroyRef = inject(DestroyRef);
}

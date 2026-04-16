import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
	let component: HeroSectionComponent;
	let fixture: ComponentFixture<HeroSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeroSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HeroSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render CTA button label', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		expect(nativeElement.textContent).toContain('Get Started');
	});

	it('should configure background video attributes', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const videoElement = nativeElement.querySelector('video');

		expect(videoElement).not.toBeNull();
		expect(videoElement?.hasAttribute('autoplay')).toBe(true);
		expect(videoElement?.hasAttribute('muted')).toBe(true);
		expect(videoElement?.hasAttribute('loop')).toBe(true);
		expect(videoElement?.hasAttribute('playsinline')).toBe(true);
	});
});

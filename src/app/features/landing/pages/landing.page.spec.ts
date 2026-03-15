import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPage } from './landing.page';

describe('LandingPage', () => {
	let component: LandingPage;
	let fixture: ComponentFixture<LandingPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LandingPage],
		}).compileComponents();

		fixture = TestBed.createComponent(LandingPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render hero section', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		expect(nativeElement.querySelector('app-hero-section')).not.toBeNull();
	});

	it('should render pain points section', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		expect(nativeElement.querySelector('app-pain-points-section')).not.toBeNull();
	});

	it('should render platform features section', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		expect(nativeElement.querySelector('app-platform-features-section')).not.toBeNull();
	});

	it('should render setup steps section', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		expect(nativeElement.querySelector('app-setup-steps-section')).not.toBeNull();
	});

	it('should render ai marketing section', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		expect(nativeElement.querySelector('app-ai-marketing-section')).not.toBeNull();
	});

	it('should render why choose section', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		expect(nativeElement.querySelector('app-why-choose-section')).not.toBeNull();
	});
});

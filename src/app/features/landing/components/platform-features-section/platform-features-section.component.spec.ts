import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformFeaturesSectionComponent } from './platform-features-section.component';

describe('PlatformFeaturesSectionComponent', () => {
	let component: PlatformFeaturesSectionComponent;
	let fixture: ComponentFixture<PlatformFeaturesSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PlatformFeaturesSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PlatformFeaturesSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render platform features', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const avatars = nativeElement.querySelectorAll('p-avatar');

		expect(avatars.length).toBe(6);
		expect(nativeElement.textContent).toContain('Patient Records');
		expect(nativeElement.textContent).toContain('AI Marketing Tools');
	});
});

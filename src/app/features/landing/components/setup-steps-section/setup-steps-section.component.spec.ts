import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupStepsSectionComponent } from './setup-steps-section.component';

describe('SetupStepsSectionComponent', () => {
	let component: SetupStepsSectionComponent;
	let fixture: ComponentFixture<SetupStepsSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SetupStepsSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SetupStepsSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render all setup steps', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const avatars = nativeElement.querySelectorAll('p-avatar');

		expect(avatars.length).toBe(4);
		expect(nativeElement.textContent).toContain('Setup Profile');
		expect(nativeElement.textContent).toContain('Grow with AI');
	});
});

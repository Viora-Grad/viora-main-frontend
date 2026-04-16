import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaSectionComponent } from './cta-section.component';

describe('CtaSectionComponent', () => {
	let component: CtaSectionComponent;
	let fixture: ComponentFixture<CtaSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CtaSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CtaSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render heading and both buttons', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;

		expect(nativeElement.textContent).toContain(
			'Viora is committed to helping providers transition',
		);
		expect(nativeElement.textContent).toContain('Get Started');
		expect(nativeElement.textContent).toContain('See How Viora Works');
	});
});

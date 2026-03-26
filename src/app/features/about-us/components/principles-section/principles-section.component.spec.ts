import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrinciplesSectionComponent } from './principles-section.component';

describe('PrinciplesSectionComponent', () => {
	let component: PrinciplesSectionComponent;
	let fixture: ComponentFixture<PrinciplesSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PrinciplesSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PrinciplesSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render title, subtitle, and all principle cards', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const cards = nativeElement.querySelectorAll('p-card');

		expect(nativeElement.textContent).toContain('What We Believe In');
		expect(nativeElement.textContent).toContain(
			'The core principles that guide our every decision.',
		);
		expect(cards.length).toBe(6);
		expect(nativeElement.textContent).toContain('Clarity Over Chaos');
		expect(nativeElement.textContent).toContain('Continuous Improvement');
	});
});

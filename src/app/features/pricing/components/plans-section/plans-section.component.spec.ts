import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlansSectionComponent } from './plans-section.component';

describe('PlansSectionComponent', () => {
	let component: PlansSectionComponent;
	let fixture: ComponentFixture<PlansSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PlansSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PlansSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render all plans', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const cards = nativeElement.querySelectorAll('p-card');

		expect(cards.length).toBe(3);
		expect(nativeElement.textContent).toContain('No Reservation');
		expect(nativeElement.textContent).toContain('Reservation');
		expect(nativeElement.textContent).toContain('Enterprise');
	});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PainPointsSectionComponent } from './pain-points-section.component';

describe('PainPointsSectionComponent', () => {
	let component: PainPointsSectionComponent;
	let fixture: ComponentFixture<PainPointsSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PainPointsSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PainPointsSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render all pain point cards', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const cards = nativeElement.querySelectorAll('p-card');

		expect(cards.length).toBe(4);
		expect(nativeElement.textContent).toContain('Scattered Records');
		expect(nativeElement.textContent).toContain('Multiple Tools');
	});
});

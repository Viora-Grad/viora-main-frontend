import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurposeSectionComponent } from './purpose-section.component';

describe('PurposeSectionComponent', () => {
	let component: PurposeSectionComponent;
	let fixture: ComponentFixture<PurposeSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PurposeSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PurposeSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render mission and vision cards', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const cards = nativeElement.querySelectorAll('p-card');

		expect(cards.length).toBe(2);
		expect(nativeElement.textContent).toContain('Our Mission');
		expect(nativeElement.textContent).toContain('Our Vision');
	});
});

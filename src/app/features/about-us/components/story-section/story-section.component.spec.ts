import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorySectionComponent } from './story-section.component';

describe('StorySectionComponent', () => {
	let component: StorySectionComponent;
	let fixture: ComponentFixture<StorySectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StorySectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(StorySectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render title and all paragraphs', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;

		expect(nativeElement.textContent).toContain('Why Viora Was Created');
		expect(nativeElement.querySelectorAll('p').length).toBe(3);
	});
});

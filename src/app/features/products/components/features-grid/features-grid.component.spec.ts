import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesGridComponent } from './features-grid.component';
import { CardModule } from 'primeng/card';

describe('FeaturesGridComponent', () => {
	let component: FeaturesGridComponent;
	let fixture: ComponentFixture<FeaturesGridComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FeaturesGridComponent, CardModule]
		}).compileComponents();

		fixture = TestBed.createComponent(FeaturesGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render all features as cards', () => {
		const nativeEl = fixture.nativeElement as HTMLElement;
		const cards = nativeEl.querySelectorAll('p-card');
		expect(cards.length).toBe(component.features.length);
	});

	it('should display feature titles', () => {
		const nativeEl = fixture.nativeElement as HTMLElement;
		expect(nativeEl.textContent).toContain('Multi-Branch Management');
		expect(nativeEl.textContent).toContain('AI Marketing Tools');
	});

	it('should display feature descriptions', () => {
		const nativeEl = fixture.nativeElement as HTMLElement;
		expect(nativeEl.textContent).toContain('Manage multiple branches');
		expect(nativeEl.textContent).toContain('Generate AI-powered posts');
	});

	it('should display benefit with check mark', () => {
		const nativeEl = fixture.nativeElement as HTMLElement;
		expect(nativeEl.textContent).toContain('✓ Centralized control');
	});

	it('should have correct feature data structure', () => {
		expect(component.features[0]).toHaveProperty('title');
		expect(component.features[0]).toHaveProperty('description');
		expect(component.features[0]).toHaveProperty('benefit');
	});
});
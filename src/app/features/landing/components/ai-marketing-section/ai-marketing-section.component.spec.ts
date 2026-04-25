import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiMarketingSectionComponent } from './ai-marketing-section.component';

describe('AiMarketingSectionComponent', () => {
	let component: AiMarketingSectionComponent;
	let fixture: ComponentFixture<AiMarketingSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AiMarketingSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AiMarketingSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render marketing content', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const listItems = nativeElement.querySelectorAll('li');
		const image = nativeElement.querySelector('img');

		expect(nativeElement.textContent).toContain('Meet ViVi');
		expect(nativeElement.textContent).toContain('New Feature');
		expect(listItems.length).toBe(3);
		expect(image?.getAttribute('ngsrc') ?? image?.getAttribute('src')).toContain(
			'images/landing-page-ai-marketing-section.png',
		);
	});
});

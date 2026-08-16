import { TestBed } from '@angular/core/testing';
import { PricingPage } from './pricing.page';

describe('PricingPage', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PricingPage],
		}).compileComponents();
	});

	it('should create the page', () => {
		const fixture = TestBed.createComponent(PricingPage);
		const page = fixture.componentInstance;

		expect(page).toBeTruthy();
	});
});

import { TestBed } from '@angular/core/testing';
import { AboutUsPage } from './about-us.page';

describe('AboutUsPage', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AboutUsPage],
		}).compileComponents();
	});

	it('should create the page', () => {
		const fixture = TestBed.createComponent(AboutUsPage);
		const page = fixture.componentInstance;

		expect(page).toBeTruthy();
	});
});

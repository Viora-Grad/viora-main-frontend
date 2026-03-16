import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		window.matchMedia ??= ((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {
				/* noop */
			},
			removeListener: () => {
				/* noop */
			},
			addEventListener: () => {
				/* noop */
			},
			removeEventListener: () => {
				/* noop */
			},
			dispatchEvent: () => false,
		})) as typeof window.matchMedia;

		await TestBed.configureTestingModule({
			imports: [AppComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});

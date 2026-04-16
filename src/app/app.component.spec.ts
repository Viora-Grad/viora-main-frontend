import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: (query: string): MediaQueryList =>
				({
					matches: false,
					media: query,
					onchange: null,
					addListener: () => {
						void 0;
					},
					removeListener: () => {
						void 0;
					},
					addEventListener: () => {
						void 0;
					},
					removeEventListener: () => {
						void 0;
					},
					dispatchEvent: () => false,
				}) as MediaQueryList,
		});

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

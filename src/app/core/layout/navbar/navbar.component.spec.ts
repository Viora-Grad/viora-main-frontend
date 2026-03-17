import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UiModeService } from '../../services/ui-mode.service';
import { vi } from 'vitest';
import { RouterTestingModule } from '@angular/router/testing';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('NavbarComponent', () => {

	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;
	let router: any;
	let uiModeService: any;

	beforeEach(async () => {

		const routerMock = {
			navigate: vi.fn()
		};

		const uiModeMock = {
			toggleDarkMode: vi.fn(),
			isDarkMode: vi.fn().mockReturnValue(false)
		};

		await TestBed.configureTestingModule({
			imports: [
				NavbarComponent,
				MenubarModule,
				ButtonModule,
				RouterTestingModule,
			],
			providers: [
				// { provide: Router, useValue: routerMock },
				{ provide: UiModeService, useValue: uiModeMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;

		router = TestBed.inject(Router);
		uiModeService = TestBed.inject(UiModeService);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize menu items on ngOnInit', () => {
		expect(component.items?.length).toBe(4);
		expect(component.items?.[0].label).toBe('Home');
		expect(component.items?.[1].label).toBe('Features');
	});

	it('should call toggleDarkMode when toggleTheme is triggered', () => {
		component.toggleTheme();

		expect(uiModeService.toggleDarkMode).toHaveBeenCalled();
	});

	it('should return dark mode state from service', () => {
		uiModeService.isDarkMode.mockReturnValue(true);

		const result = component.isDarkMode();

		expect(result).toBe(true);
		expect(uiModeService.isDarkMode).toHaveBeenCalled();
	});

	// ✅ 6
	it('should render buttons', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;
		const buttons = nativeElement.querySelectorAll('button');

		expect(buttons.length).toBeGreaterThan(1);
	});

	it('should display Viora text', () => {
		const nativeElement = fixture.nativeElement as HTMLElement;

		expect(nativeElement.textContent).toContain('Viora');
	});
});
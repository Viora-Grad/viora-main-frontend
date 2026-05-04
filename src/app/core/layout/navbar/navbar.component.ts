import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
	imports: [MenubarModule, ButtonModule, CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
	private readonly _scrollPosition = signal(0);
	public readonly isScrolled = signal(false);
	// private readonly _uiModeService = inject(UiModeService);

	public constructor() {
		effect(() => {
			// Setup scroll listener
			const handleScroll = () => {
				this._scrollPosition.set(window.scrollY);
				this.isScrolled.set(window.scrollY > 50); // Change to sticky after 50px scroll
			};

			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		});
	}

	public readonly items: MenuItem[] = [
		{
			label: 'Products',
			routerLink: '/products',
		},
		{
			label: 'Pricing',
			routerLink: '/pricing',
		},
		{
			label: 'About Us',
			routerLink: '/about',
		},
		{
			label: 'Contact',
			routerLink: '/contact',
		},
	];

	// public toggleTheme(): void {
	// 	this._uiModeService.toggleDarkMode();
	// }

	// public isDarkMode(): boolean {
	// 	return this._uiModeService.isDarkMode();
	// }
}

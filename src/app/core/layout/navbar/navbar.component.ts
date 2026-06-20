import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStore } from '../../auth/store/auth.store';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
	imports: [MenubarModule, ButtonModule, CommonModule, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
	public readonly authStore = inject(AuthStore);
	private readonly _authService = inject(AuthService);

	public currentUser = this.authStore.currentUser;

	private readonly _scrollPosition = signal(0);
	public readonly isScrolled = signal(false);

	public constructor() {
		effect(() => {
			const handleScroll = () => {
				this._scrollPosition.set(window.scrollY);
				this.isScrolled.set(window.scrollY > 50);
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

	public onLogout(): void {
		this._authService.logout();
	}
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStore } from '../../auth/store/auth.store';
import { NgOptimizedImage } from '@angular/common';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
	imports: [MenubarModule, ButtonModule, CommonModule, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit {
	public readonly authStore = inject(AuthStore);
	private readonly _authService = inject(AuthService);

	protected currentUser = this.authStore.currentUser;

	private readonly _scrollPosition = signal(0);
	public readonly isScrolled = signal(false);

	public readonly navbarHeight = output<number>();

	// eslint-disable-next-line @angular-eslint/prefer-signals
	@ViewChild('navbar')
	private readonly _navbar!: ElementRef<HTMLElement>;


	public ngAfterViewInit(): void {
		this.navbarHeight.emit(this._navbar.nativeElement.offsetHeight);
	}

	



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

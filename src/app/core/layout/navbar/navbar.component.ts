import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { UiModeService } from '../../services/ui-mode.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
	imports: [MenubarModule, ButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
	public readonly items: MenuItem[] = [
		{
			label: 'Home',
			command: () => void this._router.navigate(['']),
		},
		{
			label: 'Features',
			routerLink: 'features',
		},
		{
			label: 'Contact',
			routerLink: 'contact',
		},
		{
			label: 'About us',
			routerLink: 'about',
		},
	];

	private readonly _router = inject(Router);
	private readonly _uiModeService = inject(UiModeService);

	public toggleTheme(): void {
		this._uiModeService.toggleDarkMode();
	}

	public isDarkMode(): boolean {
		return this._uiModeService.isDarkMode();
	}
}

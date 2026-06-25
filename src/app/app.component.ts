import { ChangeDetectionStrategy, Component, effect, inject , } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthApi } from './core/auth/apis/auth.api';
import { AuthStore } from './core/auth/store/auth.store';
import { FooterComponent } from './core/layout/footer/footer.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NavbarComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  {
	private readonly _authStore = inject(AuthStore);
	private readonly _authApi = inject(AuthApi);

	public onNavbarHeight(height: number): void {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const content = document.querySelector('.main-content') as HTMLElement;
    if (content) {
		// console.log('Navbar height:', height);
        content.style.marginTop = `${height+30}px`;
    }
}



	public constructor() {
		effect(() => {
			const authenticated = this._authStore.isAuthenticated();
			const currentUser = this._authStore.currentUser();

			if (authenticated && !currentUser) {
				this._authApi.getProfile().subscribe({
					next: (user) => this._authStore.setCurrentUser(user),
				});
			}
		});
	}
}

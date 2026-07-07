import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { RegisterStepOneSectionComponent } from './components/step-one/register-step-one-section.component';
import { RegisterStepThreeSectionComponent } from './components/step-three/register-step-three-section.component';
import { RegisterStepTwoSectionComponent } from './components/step-two/register-step-two-section.component';
import { RegisterStore } from './store/register.store';

@Component({
	selector: 'app-register-page',
	imports: [
		ToastModule,
		RegisterStepOneSectionComponent,
		RegisterStepTwoSectionComponent,
		RegisterStepThreeSectionComponent,
	],
	providers: [RegisterStore, MessageService],
	templateUrl: './register.page.html',
	styleUrl: './register.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage implements OnInit {
	private static readonly _googleAuthCodeKey = 'google_auth_code';

	protected readonly registerStore = inject(RegisterStore);
	private readonly _authService = inject(AuthService);
	private readonly _messageService = inject(MessageService);
	private readonly _router = inject(Router);

	public ngOnInit(): void {
		const googleAuthCode = sessionStorage.getItem(RegisterPage._googleAuthCodeKey);

		if (!googleAuthCode) return;

		sessionStorage.removeItem(RegisterPage._googleAuthCodeKey);

		this._authService.validateGoogleAccount(googleAuthCode).subscribe({
			next: (response) => {
				if (response.isUserExists) {
					this._messageService.add({
						severity: 'error',
						summary: 'Account Exists',
						detail: 'This Google account is already registered. Please sign in instead.',
						life: 5000,
					});
					setTimeout(() => {
						void this._router.navigate(['/auth/login']);
					}, 2000);
					return;
				}

			this.registerStore.setGoogleAuthCode(googleAuthCode);
			this.registerStore.setProviderDetails(response.provider, response.providerKey);
				this.registerStore.setEmail(response.email);
				this.registerStore.nextStep();
			},
			error: () => {
				this._messageService.add({
					severity: 'error',
					summary: 'Validation Failed',
					detail: 'Unable to validate Google account. Please try again.',
					life: 5000,
				});
				setTimeout(() => {
					void this._router.navigate(['/auth/login']);
				}, 2000);
			},
		});
	}
}

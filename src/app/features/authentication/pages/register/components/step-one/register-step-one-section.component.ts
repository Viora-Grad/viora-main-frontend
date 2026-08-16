import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../../../core/auth/services/auth.service';
import { GoogleAuthService } from '../../../../../../core/auth/services/google-auth.service';
import { GoogleButtonComponent } from '../../../../components/google-button/google-button.component';
import { RegisterStore } from '../../store/register.store';

@Component({
	selector: 'app-register-step-one-section',
	imports: [
		GoogleButtonComponent,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		IconFieldModule,
		InputIconModule,
	],
	templateUrl: './register-step-one-section.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterStepOneSectionComponent {
	private readonly _googleAuthService = inject(GoogleAuthService);
	private readonly _registerStore = inject(RegisterStore);
	private readonly _authService = inject(AuthService);
	private readonly _messageService = inject(MessageService);

	private static readonly _googleAuthFlowKey = 'google_auth_flow';

	public readonly isSubmitting = signal(false);
	public readonly completed = output<string>();

	public readonly emailForm = new FormGroup({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		email: new FormControl('', [Validators.required, Validators.email]),
	});

	public get emailControl(): FormControl<string | null> {
		return this.emailForm.controls.email;
	}

	public onGoogleLogin(): void {
		sessionStorage.setItem(RegisterStepOneSectionComponent._googleAuthFlowKey, 'register');
		this._registerStore.setGoogleSignup(true);
		void this._googleAuthService.redirectToGoogle();
	}

	public onContinue(): void {
		this.emailForm.markAllAsTouched();

		if (this.emailForm.invalid) return;

		const { email } = this.emailForm.getRawValue();
		this.isSubmitting.set(true);

		this._authService.validateEmail(email!).subscribe({
			next: (exists) => {
				this.isSubmitting.set(false);

				if (exists) {
					this._messageService.add({
						severity: 'error',
						summary: 'Email Taken',
						detail:
							'This email address is already registered. Please use a different one or sign in.',
						life: 5000,
					});
					return;
				}

				this._registerStore.setEmail(email!);
				this._registerStore.nextStep();
				this.completed.emit(email!);
			},
			error: () => {
				this.isSubmitting.set(false);
				this._messageService.add({
					severity: 'error',
					summary: 'Validation Failed',
					detail: 'Unable to validate email. Please try again.',
					life: 5000,
				});
			},
		});
	}
}

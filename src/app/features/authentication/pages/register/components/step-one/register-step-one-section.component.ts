import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
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

	private static readonly GOOGLE_AUTH_FLOW_KEY = 'google_auth_flow';

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
		sessionStorage.setItem(RegisterStepOneSectionComponent.GOOGLE_AUTH_FLOW_KEY, 'register');
		this._registerStore.setGoogleSignup(true);
		void this._googleAuthService.redirectToGoogle();
	}

	public onContinue(): void {
		this.emailForm.markAllAsTouched();

		if (this.emailForm.invalid) return;

		const { email } = this.emailForm.getRawValue();
		this._registerStore.setEmail(email!);
		this._registerStore.nextStep();
		this.completed.emit(email!);
	}
}

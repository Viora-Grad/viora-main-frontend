import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	inject,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../../../../core/auth/services/auth.service';
import { RegisterStore } from '../../store/register.store';

function passwordMatchValidator(confirmCtrl: AbstractControl): ValidationErrors | null {
	const group = confirmCtrl.parent;
	if (!group) return null;

	const password = group.get('password')?.value as string | null;
	const confirm = confirmCtrl.value as string | null;

	if (!password || !confirm) return null;

	return password === confirm ? null : { passwordMismatch: true };
}

@Component({
	selector: 'app-register-step-three-section',
	imports: [ReactiveFormsModule, PasswordModule, ButtonModule],
	templateUrl: './register-step-three-section.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterStepThreeSectionComponent {
	private readonly _registerStore = inject(RegisterStore);
	private readonly _authService = inject(AuthService);
	private readonly _messageService = inject(MessageService);
	private readonly _destroyRef = inject(DestroyRef);

	protected readonly isSubmitting = signal(false);

	protected readonly passwordForm = new FormGroup({
		password: new FormControl('', [
			// eslint-disable-next-line @typescript-eslint/unbound-method
			Validators.required,
			Validators.minLength(8),
			Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/),
		]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		confirmPassword: new FormControl('', [Validators.required, passwordMatchValidator]),
	});

	private readonly _passwordValue = signal(this.passwordForm.controls.password.value ?? '');

	protected readonly passwordChecks = computed(() => {
		const pwd = this._passwordValue();
		return {
			minLength: pwd.length >= 8,
			hasUppercase: /[A-Z]/.test(pwd),
			hasNumber: /[0-9]/.test(pwd),
			hasSpecial: /[^A-Za-z0-9]/.test(pwd),
		};
	});

	public constructor() {
		this.passwordForm.controls.password.valueChanges
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((value) => {
				this._passwordValue.set(value ?? '');
				this.passwordForm.controls.confirmPassword.updateValueAndValidity({
					onlySelf: true,
					emitEvent: false,
				});
			});
	}

	public get passwordControl(): FormControl<string | null> {
		return this.passwordForm.controls.password;
	}

	public get confirmPasswordControl(): FormControl<string | null> {
		return this.passwordForm.controls.confirmPassword;
	}

	public onCreateAccount(): void {
		this.passwordForm.markAllAsTouched();

		if (this.passwordForm.invalid) return;

		const { password } = this.passwordForm.getRawValue();
		this._registerStore.setPassword(password!);

		this.isSubmitting.set(true);

		const { email, firstName, lastName, dateOfBirth, gender } = this._registerStore;

		this._authService
			.register({
				email: email(),
				password: password!,
				firstName: firstName(),
				lastName: lastName(),
				dateOfBirth: dateOfBirth(),
				gender: gender()!,
			})
			.subscribe({
				next: () => {
					this.isSubmitting.set(false);
				},
				error: (err: { error?: { message?: string } }) => {
					this.isSubmitting.set(false);
					this._messageService.add({
						severity: 'error',
						summary: 'Registration Failed',
						detail: err?.error?.message ?? 'Unable to complete registration. Please try again.',
						life: 5000,
					});
				},
			});
	}
}

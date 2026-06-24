import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'app-change-password',
	imports: [ReactiveFormsModule, InputTextModule, ButtonModule,ToastModule,],
	providers: [MessageService],
	templateUrl: './ChangePassword.component.html',
	styleUrl: './ChangePassword.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class ChangePasswordComponent {
	private readonly _fb = inject(FormBuilder);
	private readonly _toast = inject(MessageService);
	protected readonly saving = signal(false);




	protected passwordMatchValidator: ValidatorFn = (
		control: AbstractControl
	): ValidationErrors | null => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const password = control.get('newPassword')?.value;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const confirmPassword = control.get('confirmPassword')?.value;

		return password === confirmPassword ? null : { passwordMismatch: true };
	};

	protected readonly changePasswordForm: FormGroup = this._fb.group(
		{
			// eslint-disable-next-line @typescript-eslint/unbound-method
			oldPassword: ['', [Validators.required]],
			// eslint-disable-next-line @typescript-eslint/unbound-method
			newPassword: ['', [Validators.required]],
			// eslint-disable-next-line @typescript-eslint/unbound-method
			confirmPassword: ['', [Validators.required]],
		},
		{
			validators: this.passwordMatchValidator,
		});

	protected readonly onCancel = (): void => {
		this.changePasswordForm.reset({
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		});
	};

	protected readonly onSave = (): void => {
		if (this.changePasswordForm.invalid) {
			this.changePasswordForm.markAllAsTouched();
			return;
		}
		this.saving.set(true);
		setTimeout(() => {
			this.saving.set(false);
			this._toast.add({
				severity: 'success',
				summary: 'Saved',
				detail: 'Password updated successfully',
				life: 3000,
			});
		}, 800);
	};


}

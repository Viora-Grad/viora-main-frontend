import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../../core/auth/store/auth.store';
import { Gender } from '../../../../core/models/gender.enum';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
	selector: 'app-personal-info',
	imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, SelectModule, DatePickerModule,],
	providers: [MessageService],
	templateUrl: './PersonalInfo.component.html',
	styleUrl: './PersonalInfo.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class PersonalInfoComponent implements OnInit {
	private readonly _fb = inject(FormBuilder);
	private readonly _toast = inject(MessageService);

	protected readonly saving = signal(false);
	private readonly _authStore = inject(AuthStore);

	private readonly _currentUser = this._authStore.currentUser;


	protected readonly genderOptions = Object.values(Gender).map((value) => ({ label: value, value, }));
	public selectedGender = this._currentUser()?.gender ?? 'Female';

	protected readonly changeInfoForm: FormGroup = this._fb.group({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		firstName: ['', [Validators.required]],
		// eslint-disable-next-line @typescript-eslint/unbound-method
		lastName: ['', [Validators.required]],
		// eslint-disable-next-line @typescript-eslint/unbound-method
		email: ['', [Validators.required, Validators.email]],
		dateOfBirth: [''],
		gender: [''],
	});

	public ngOnInit(): void {
		const user = this._currentUser();
		if (user) {
			this.changeInfoForm.patchValue({
				firstName: user?.firstName,
				lastName: user?.lastName,
				email: user?.email,
				dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
				gender: user?.gender,
			});
		}
	}


	protected readonly onCancel = (): void => {
		const user = this._currentUser();
		this.changeInfoForm.reset({
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			dateOfBirth: user?.dateOfBirth ? new Date(user?.dateOfBirth) : null,
			gender: user?.gender,
		});
	};

	protected readonly onSave = (): void => {
		if (this.changeInfoForm.invalid) {
			this.changeInfoForm.markAllAsTouched();
			return;
		}
		this.saving.set(true);
		setTimeout(() => {
			this.saving.set(false);
			this._toast.add({
				severity: 'success',
				summary: 'Saved',
				detail: 'Profile updated successfully',
				life: 3000,
			});
		}, 800);
	};
}

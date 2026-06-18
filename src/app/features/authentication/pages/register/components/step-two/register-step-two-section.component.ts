import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Gender } from '../../../../../../core/models/gender.enum';
import { RegisterStore } from '../../store/register.store';

const MIN_AGE = 21;

function minimumAgeValidator(minAge: number) {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value as Date | null;
		if (!value) return null;

		const birthDate = new Date(value);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		return age >= minAge ? null : { minimumAge: { requiredAge: minAge, actualAge: age } };
	};
}

@Component({
	selector: 'app-register-step-two-section',
	imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DatePickerModule, SelectModule],
	templateUrl: './register-step-two-section.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterStepTwoSectionComponent {
	protected readonly registerStore = inject(RegisterStore);
	private readonly _messageService = inject(MessageService);

	protected readonly maxDate = new Date();

	protected readonly genderOptions = [
		{ label: 'Select gender', value: null },
		{ label: 'Male', value: Gender.Male },
		{ label: 'Female', value: Gender.Female },
	];

	protected readonly profileForm = new FormGroup({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		firstName: new FormControl('', [Validators.required]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		lastName: new FormControl('', [Validators.required]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		dateOfBirth: new FormControl<Date | null>(null, [
			// eslint-disable-next-line @typescript-eslint/unbound-method
			Validators.required,
			minimumAgeValidator(MIN_AGE),
		]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		gender: new FormControl<Gender | null>(null, [Validators.required]),
	});

	public get firstNameControl(): FormControl<string | null> {
		return this.profileForm.controls.firstName;
	}

	public get lastNameControl(): FormControl<string | null> {
		return this.profileForm.controls.lastName;
	}

	public get dateOfBirthControl(): FormControl<Date | null> {
		return this.profileForm.controls.dateOfBirth;
	}

	public get genderControl(): FormControl<Gender | null> {
		return this.profileForm.controls.gender;
	}

	public onContinue(): void {
		this.profileForm.markAllAsTouched();

		if (this.profileForm.invalid) return;

		const { firstName, lastName, dateOfBirth, gender } = this.profileForm.getRawValue();

		this.registerStore.setProfileDetails(
			firstName!,
			lastName!,
			dateOfBirth!.toISOString(),
			gender!,
		);

		this.registerStore.nextStep();
	}
}

import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	OnInit,
	inject,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Country } from '../../../../../../core/models/country.model';
import { OrganizationService } from '../../../../services/organization.service';
import { OnboardingStore } from '../../store/onboarding.store';

@Component({
	selector: 'app-onboarding-step-one',
	imports: [ReactiveFormsModule, SelectModule, InputTextModule, TextareaModule, ButtonModule],
	templateUrl: './onboarding-step-one.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStepOneComponent implements OnInit {
	private readonly _onboardingStore = inject(OnboardingStore);
	private readonly _organizationService = inject(OrganizationService);
	private readonly _destroyRef = inject(DestroyRef);

	protected readonly isSubmitting = signal(false);
	protected readonly isCheckingName = signal(false);
	protected readonly countries = signal<Country[]>([]);

	protected readonly organizationForm = new FormGroup({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		countryId: new FormControl<string | null>(null, [Validators.required]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		proposedName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		about: new FormControl('', [Validators.required]),
	});

	public get countryControl(): FormControl<string | null> {
		return this.organizationForm.controls.countryId;
	}

	public get proposedNameControl(): FormControl<string | null> {
		return this.organizationForm.controls.proposedName;
	}

	public get aboutControl(): FormControl<string | null> {
		return this.organizationForm.controls.about;
	}

	public ngOnInit(): void {
		this._organizationService.getCountries().subscribe({
			next: (countries) => this.countries.set(countries),
		});

		this.organizationForm.patchValue({
			countryId: this._onboardingStore.countryId() || null,
			proposedName: this._onboardingStore.proposedName(),
			about: this._onboardingStore.about(),
		});

		this._setupNameValidation();
	}

	private _setupNameValidation(): void {
		const nameControl = this.organizationForm.controls.proposedName;

		nameControl.valueChanges
			.pipe(
				debounceTime(400),
				distinctUntilChanged(),
				takeUntilDestroyed(this._destroyRef),
			)
			.subscribe((value) => {
				if (!value || value.trim().length === 0) {
					this.isCheckingName.set(false);
					return;
				}

				this.isCheckingName.set(true);

				this._organizationService.checkOrganizationExists(value.trim()).subscribe({
					next: (exists) => {
						this.isCheckingName.set(false);
						if (exists) {
							nameControl.setErrors({ ...nameControl.errors, nameExists: true });
						} else {
							const errors = { ...nameControl.errors };
							delete errors['nameExists'];
							nameControl.setErrors(Object.keys(errors).length ? errors : null);
						}
					},
					error: () => {
						this.isCheckingName.set(false);
					},
				});
			});
	}

	public onContinue(): void {
		this.organizationForm.markAllAsTouched();

		if (this.organizationForm.invalid) return;

		const { countryId, proposedName, about } = this.organizationForm.getRawValue();
		this._onboardingStore.setOrganizationInfo(countryId!, proposedName!, about!);
		this._onboardingStore.nextStep();
	}
}

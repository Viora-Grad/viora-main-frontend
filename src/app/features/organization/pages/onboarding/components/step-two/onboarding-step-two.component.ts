import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { OnboardingStore } from '../../store/onboarding.store';
import { OrganizationService } from '../../../../services/organization.service';

@Component({
	selector: 'app-onboarding-step-two',
	imports: [ReactiveFormsModule, MultiSelectModule, TextareaModule, ButtonModule],
	templateUrl: './onboarding-step-two.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStepTwoComponent implements OnInit {
	protected readonly onboardingStore = inject(OnboardingStore);
	private readonly _organizationService = inject(OrganizationService);

	protected readonly isSubmitting = signal(false);
	protected readonly serviceTypeOptions = signal<string[]>([]);

	protected readonly servicesForm = new FormGroup({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		serviceTypes: new FormControl<string[] | null>([], [Validators.required]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		serviceDescription: new FormControl('', [Validators.required]),
	});

	public get serviceTypesControl(): FormControl<string[] | null> {
		return this.servicesForm.controls.serviceTypes;
	}

	public get serviceDescriptionControl(): FormControl<string | null> {
		return this.servicesForm.controls.serviceDescription;
	}

	public ngOnInit(): void {
		this._organizationService.getServiceTypes().subscribe({
			next: (types) => this.serviceTypeOptions.set(types),
		});

		this.servicesForm.patchValue({
			serviceTypes: this.onboardingStore.serviceTypes(),
			serviceDescription: this.onboardingStore.serviceDescription(),
		});
	}

	public onContinue(): void {
		this.servicesForm.markAllAsTouched();

		if (this.servicesForm.invalid) return;

		const { serviceTypes, serviceDescription } = this.servicesForm.getRawValue();
		this.onboardingStore.setServices(serviceTypes ?? [], serviceDescription!);
		this.onboardingStore.nextStep();
	}
}

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ReferralSource } from '../../../../../../core/models/referral-source.enum';
import { OrganizationService } from '../../../../services/organization.service';
import { OnboardingStore } from '../../store/onboarding.store';

@Component({
	selector: 'app-onboarding-step-three',
	imports: [ReactiveFormsModule, SelectModule, InputTextModule, TextareaModule, ButtonModule],
	templateUrl: './onboarding-step-three.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStepThreeComponent implements OnInit {
	private readonly _onboardingStore = inject(OnboardingStore);
	private readonly _organizationService = inject(OrganizationService);
	private readonly _router = inject(Router);
	private readonly _messageService = inject(MessageService);

	protected readonly onboardingStore = inject(OnboardingStore);

	protected readonly isSubmitting = signal(false);

	protected readonly referralSourceOptions = [
		{ label: 'Friend', value: ReferralSource.Friend },
		{ label: 'Social Media', value: ReferralSource.SocialMedia },
		{ label: 'Facebook', value: ReferralSource.Facebook },
		{ label: 'LinkedIn', value: ReferralSource.LinkedIn },
		{ label: 'Instagram', value: ReferralSource.Instagram },
		{ label: 'Google Search', value: ReferralSource.GoogleSearch },
		{ label: 'Advertisement', value: ReferralSource.Advertisement },
		{ label: 'Website', value: ReferralSource.Website },
		{ label: 'Email Campaign', value: ReferralSource.EmailCampaign },
		{ label: 'Conference', value: ReferralSource.Conference },
		{ label: 'Partner', value: ReferralSource.Partner },
		{ label: 'Other', value: ReferralSource.Other },
	];

	protected readonly additionalForm = new FormGroup({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		letter: new FormControl('', [Validators.required]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		referralSource: new FormControl<ReferralSource | null>(null, [Validators.required]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		billingEmail: new FormControl('', [Validators.required, Validators.email]),
		// eslint-disable-next-line @typescript-eslint/unbound-method
		supportEmail: new FormControl('', [Validators.required, Validators.email]),
	});

	public get letterControl(): FormControl<string | null> {
		return this.additionalForm.controls.letter;
	}

	public get referralSourceControl(): FormControl<ReferralSource | null> {
		return this.additionalForm.controls.referralSource;
	}

	public get billingEmailControl(): FormControl<string | null> {
		return this.additionalForm.controls.billingEmail;
	}

	public get supportEmailControl(): FormControl<string | null> {
		return this.additionalForm.controls.supportEmail;
	}

	public ngOnInit(): void {
		this.additionalForm.patchValue({
			letter: this.onboardingStore.letter(),
			referralSource: this.onboardingStore.referralSource() ?? null,
			billingEmail: this.onboardingStore.billingEmail(),
			supportEmail: this.onboardingStore.supportEmail(),
		});
	}

	public onSubmit(): void {
		this.additionalForm.markAllAsTouched();

		if (this.additionalForm.invalid) return;

		const { letter, referralSource, billingEmail, supportEmail } =
			this.additionalForm.getRawValue();
		this.onboardingStore.setAdditionalInfo(
			letter ?? '',
			referralSource ?? ReferralSource.Unknown,
			billingEmail ?? '',
			supportEmail ?? '',
		);

		this.isSubmitting.set(true);

		const request = this._onboardingStore.getOnboardingRequest();
		this._organizationService.submitOnboarding(request).subscribe({
			next: () => {
				this.isSubmitting.set(false);
				this._onboardingStore.reset();
				void this._router.navigate(['/']);
			},
			error: (err: { status?: number; error?: { message?: string } }) => {
				this.isSubmitting.set(false);

				if (err.status === 409) {
					this._messageService.add({
						severity: 'warn',
						summary: 'Already Applied',
						detail: 'You already have an existing application.',
						life: 5000,
					});
					setTimeout(() => {
						void this._router.navigate(['/']);
					}, 2000);
					return;
				}

				this._messageService.add({
					severity: 'error',
					summary: 'Submission Failed',
					detail: err?.error?.message ?? 'Unable to submit application. Please try again.',
					life: 5000,
				});
			},
		});
	}
}

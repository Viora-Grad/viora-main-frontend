import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RegisterStore } from './store/register.store';
import { RegisterStepOneSectionComponent } from './components/step-one/register-step-one-section.component';
import { RegisterStepTwoSectionComponent } from './components/step-two/register-step-two-section.component';
import { RegisterStepThreeSectionComponent } from './components/step-three/register-step-three-section.component';
import { RegisterStepFourSectionComponent } from './components/step-four/register-step-four-section.component';

@Component({
	selector: 'app-register-page',
	imports: [
		ToastModule,
		RegisterStepOneSectionComponent,
		RegisterStepTwoSectionComponent,
		RegisterStepThreeSectionComponent,
		RegisterStepFourSectionComponent,
	],
	providers: [RegisterStore],
	templateUrl: './register.page.html',
	styleUrl: './register.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage implements OnInit {
	private static readonly GOOGLE_AUTH_CODE_KEY = 'google_auth_code';

	protected readonly registerStore = inject(RegisterStore);

	public ngOnInit(): void {
		const googleAuthCode = sessionStorage.getItem(RegisterPage.GOOGLE_AUTH_CODE_KEY);

		if (googleAuthCode) {
			sessionStorage.removeItem(RegisterPage.GOOGLE_AUTH_CODE_KEY);
			this.registerStore.setGoogleAuthCode(googleAuthCode);
			this.registerStore.nextStep();
		}
	}
}

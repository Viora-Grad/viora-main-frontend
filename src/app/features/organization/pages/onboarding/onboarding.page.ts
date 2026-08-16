import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OnboardingStore } from './store/onboarding.store';
import { OnboardingStepOneComponent } from './components/step-one/onboarding-step-one.component';
import { OnboardingStepTwoComponent } from './components/step-two/onboarding-step-two.component';
import { OnboardingStepThreeComponent } from './components/step-three/onboarding-step-three.component';

@Component({
	selector: 'app-onboarding-page',
	imports: [
		ToastModule,
		OnboardingStepOneComponent,
		OnboardingStepTwoComponent,
		OnboardingStepThreeComponent,
	],
	providers: [OnboardingStore, MessageService],
	templateUrl: './onboarding.page.html',
	styleUrl: './onboarding.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingPage {
	protected readonly onboardingStore = inject(OnboardingStore);
}

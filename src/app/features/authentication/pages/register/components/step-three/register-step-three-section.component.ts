import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-register-step-three-section',
	template: `
		<p class="text-[15px] text-gray-500 font-medium leading-relaxed mb-8">
			Step 3 — Coming soon.
		</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterStepThreeSectionComponent {}

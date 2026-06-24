import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { SplitAndCapitalizePipe } from '../../pipes/split-and-capitalize.pipe';
import { Plan } from '../../models/plan.model';
import { PricingService } from '../../services/pricing.service';

@Component({
	selector: 'app-plans-section',
	imports: [ButtonModule, CardModule, SkeletonModule, TooltipModule, SplitAndCapitalizePipe, CurrencyPipe],
	templateUrl: './plans-section.component.html',
	styleUrl: './plans-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansSectionComponent implements OnInit {
	private readonly _pricingService = inject(PricingService);

	public readonly title = 'Simple, transparent pricing for every provider';
	public readonly subtitle =
		"Choose the plan that best fits your practice's needs and scale with confidence. No hidden fees, no surprises.";

	public readonly plans = signal<readonly Plan[]>([]);
	public readonly loading = signal<boolean>(true);

	public ngOnInit(): void {
		this._pricingService.getAllPlans().subscribe({
			next: (plans) => {
				this.plans.set(plans);
				this.loading.set(false);
			},
			error: () => {
				this.loading.set(false);
			},
		});
	}
}

import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { forkJoin } from 'rxjs';
import { OrganizationService } from '../../../organization/services/organization.service';
import { OrderService } from '../../../pricing/services/order.service';
import { PricingService } from '../../../pricing/services/pricing.service';
import { Subscription } from '../../../pricing/models/subscription.model';
import { Plan } from '../../../pricing/models/plan.model';

@Component({
	selector: 'app-subscription',
	imports: [DatePipe, ProgressSpinnerModule, TagModule, ChipModule],
	templateUrl: './subscription.component.html',
	styleUrl: './subscription.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionComponent implements OnInit {
	private readonly _organizationService = inject(OrganizationService);
	private readonly _orderService = inject(OrderService);
	private readonly _pricingService = inject(PricingService);

	protected readonly subscriptions = signal<readonly Subscription[]>([]);
	protected readonly planMap = signal<Map<string, Plan>>(new Map());
	protected readonly isLoading = signal(true);
	protected readonly error = signal<string | null>(null);

	public ngOnInit(): void {
		this._loadSubscriptions();
	}

	private _loadSubscriptions(): void {
		this._organizationService.getOrganization().subscribe({
			next: (org) => {
				this._orderService.getSubscriptions(org.id).subscribe({
					next: (subs) => {
						this.subscriptions.set(subs);
						this._loadPlans(subs);
					},
					error: () => {
						this.error.set('Failed to load subscriptions.');
						this.isLoading.set(false);
					},
				});
			},
			error: () => {
				this.error.set('Failed to load organization details.');
				this.isLoading.set(false);
			},
		});
	}

	private _loadPlans(subs: readonly Subscription[]): void {
		const uniquePlanIds = [...new Set(subs.map((s) => s.planId))];

		if (uniquePlanIds.length === 0) {
			this.isLoading.set(false);
			return;
		}

		forkJoin(uniquePlanIds.map((id) => this._pricingService.getPlan(id))).subscribe({
			next: (plans) => {
				const map = new Map<string, Plan>();
				plans.forEach((plan) => map.set(plan.id, plan));
				this.planMap.set(map);
				this.isLoading.set(false);
			},
			error: () => {
				this.isLoading.set(false);
			},
		});
	}

	protected getPlan(planId: string): Plan | undefined {
		return this.planMap().get(planId);
	}

	protected getStatusSeverity(
		status: string,
	): 'success' | 'warn' | 'danger' | 'info' | 'secondary' | 'contrast' {
		switch (status) {
			case 'Active':
				return 'success';
			case 'Pending':
				return 'warn';
			case 'Expired':
				return 'danger';
			case 'Cancelled':
				return 'secondary';
			default:
				return 'info';
		}
	}

	protected formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}
}

import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { catchError, switchMap, throwError } from 'rxjs';
import { SplitAndCapitalizePipe } from '../../pipes/split-and-capitalize.pipe';
import { Plan } from '../../models/plan.model';
import { PricingService } from '../../services/pricing.service';
import { OrganizationService } from '../../../organization/services/organization.service';
import { SubscribeConfirmDialogComponent } from '../subscribe-confirm-dialog/subscribe-confirm-dialog.component';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-plans-section',
	imports: [ButtonModule, CardModule, SkeletonModule, TooltipModule, SplitAndCapitalizePipe, CurrencyPipe, SubscribeConfirmDialogComponent],
	templateUrl: './plans-section.component.html',
	styleUrl: './plans-section.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansSectionComponent implements OnInit {
	private readonly _pricingService = inject(PricingService);
	private readonly _organizationService = inject(OrganizationService);
	private readonly _orderService = inject(OrderService);
	private readonly _messageService = inject(MessageService);

	public readonly title = 'Simple, transparent pricing for every provider';
	public readonly subtitle =
		"Choose the plan that best fits your practice's needs and scale with confidence. No hidden fees, no surprises.";

	public readonly plans = signal<readonly Plan[]>([]);
	public readonly loading = signal<boolean>(true);

	public readonly dialogVisible = signal<boolean>(false);
	public readonly selectedPlanName = signal<string>('');
	public readonly organizationName = signal<string>('');

	private _selectedPlanId = '';
	private _organizationId = '';

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

	public onPlanCtaClick(plan: Plan): void {
		this._organizationService.getOrganization().pipe(
			catchError((error: { status?: number }) => {
				if (error.status === 404) {
					this._messageService.add({
						severity: 'warn',
						summary: 'No Organization',
						detail: 'You have no organization. Please create one first.',
					});
				}
				return throwError(() => error);
			}),
		).subscribe({
			next: (organization) => {
				this._selectedPlanId = plan.id;
				this._organizationId = organization.id;
				this.selectedPlanName.set(plan.name);
				this.organizationName.set(organization.name);
				this.dialogVisible.set(true);
			},
		});
	}

	public onDialogConfirm(): void {
		this.dialogVisible.set(false);

		this._orderService.createSubscription({
			organizationId: this._organizationId,
			planId: this._selectedPlanId,
		}).pipe(
			switchMap((orderId) => this._orderService.getPaymentSession(orderId)),
		).subscribe({
			next: (response) => {
				window.location.href = response.paymentUrl;
			},
			error: () => {
				this._messageService.add({
					severity: 'error',
					summary: 'Subscription Failed',
					detail: 'Something went wrong. Please try again.',
				});
			},
		});
	}
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { PlansSectionComponent } from '../components/plans-section/plans-section.component';

@Component({
	selector: 'app-pricing-page',
	imports: [PlansSectionComponent, ToastModule],
	templateUrl: './pricing.page.html',
	styleUrl: './pricing.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompareSectionComponent } from '../components/compare-section/compare-section.component';
import { PlansSectionComponent } from '../components/plans-section/plans-section.component';

@Component({
	selector: 'app-pricing-page',
	imports: [PlansSectionComponent, CompareSectionComponent],
	templateUrl: './pricing.page.html',
	styleUrl: './pricing.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage {}

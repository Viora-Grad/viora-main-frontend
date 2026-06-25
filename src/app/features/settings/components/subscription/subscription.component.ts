import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-subscription',
	imports: [],
	templateUrl: './subscription.component.html',
	styleUrl: './subscription.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class SubscriptionComponent {}

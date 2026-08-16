import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
	selector: 'app-subscribe-confirm-dialog',
	imports: [DialogModule, ButtonModule],
	template: `
		<p-dialog
			[(visible)]="visible"
			[modal]="true"
			[draggable]="false"
			[resizable]="false"
			header="Confirm Subscription"
			styleClass="subscribe-confirm-dialog"
		>
			<div class="flex flex-col gap-2">
				<p>Do you want to subscribe to <strong>{{ planName() }}</strong> for <strong>{{ organizationName() }}</strong>?</p>
			</div>
			<ng-template pTemplate="footer">
				<p-button label="Cancel" severity="secondary" [text]="true" (click)="visible.set(false)" />
				<p-button label="Confirm" (click)="confirm.emit()" />
			</ng-template>
		</p-dialog>
	`,
	styleUrl: './subscribe-confirm-dialog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeConfirmDialogComponent {
	public readonly visible = model.required<boolean>();
	public readonly planName = input.required<string>();
	public readonly organizationName = input.required<string>();

	public readonly confirm = output<void>();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-authentication',
	imports: [],
	templateUrl: './authentication.page.html',
	styleUrl: './authentication.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationPage {}

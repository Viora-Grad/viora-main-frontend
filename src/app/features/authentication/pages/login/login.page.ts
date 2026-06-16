import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { GoogleButtonComponent } from '../../components/google-button/google-button.component';
import { GoogleAuthService } from '../../../../core/auth/services/google-auth.service';

@Component({
	selector: 'app-login-page',
	imports: [
		GoogleButtonComponent,
		RouterLink,
		ButtonModule,
		InputTextModule,
		PasswordModule,
		CheckboxModule,
		ReactiveFormsModule,
		IconFieldModule,
		InputIconModule,
		ToastModule,
	],
	templateUrl: './login.page.html',
	styleUrl: './login.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
	private readonly _googleAuthService = inject(GoogleAuthService);

	public readonly form = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
		rememberMe: new FormControl(false),
	});

	public ngOnInit(): void {
		this._googleAuthService.initialize();
	}

	public onGoogleLogin(): void {
		void this._googleAuthService.redirectToGoogle();
	}
}

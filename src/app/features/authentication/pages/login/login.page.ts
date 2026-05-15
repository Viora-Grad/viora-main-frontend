import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { GoogleButtonComponent } from '../../components/google-button/google-button.component';

@Component({
	selector: 'app-login-page',
	imports: [
		GoogleButtonComponent,
		RouterLink,
		ButtonModule,
		InputTextModule,
		PasswordModule,
		CheckboxModule,
		FormsModule,
		IconFieldModule,
		InputIconModule,
	],
	templateUrl: './login.page.html',
	styleUrl: './login.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}

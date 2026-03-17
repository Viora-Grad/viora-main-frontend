import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiModeService } from './core/services/ui-mode.service';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NavbarComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	private readonly _uiModeService = inject(UiModeService);
}

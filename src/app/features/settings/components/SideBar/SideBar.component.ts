import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SplitterModule } from 'primeng/splitter';

@Component({
	selector: 'app-side-bar',
	imports: [SplitterModule, PanelMenuModule],
	templateUrl: './SideBar.component.html',
	styleUrl: './SideBar.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class SideBarComponent implements OnInit {
	public items: MenuItem[] = [];

	public ngOnInit() {
		this.items = [
			{
				label: 'Personal-Info',
				icon: 'pi pi-user',
				routerLink: '/settings/personal-info',
				// command: () => this.setActive('personal-info')
			},
			{
				label: 'Account Security',
				icon: 'pi pi-shield',
				// routerLink: '/settings/security',
				// command: () => this.setActive('security'),
				items: [
					{
						label: 'Change password',
						icon: 'pi pi-lock',
						routerLink: '/settings/account-security/change-password',
						// command: () => this.setActive('change-password')
					},
				],
			},
			{
				label: 'Organization',
				icon: 'pi pi-building',
				items: [
					{
						label: 'Application',
						icon: 'pi pi-file-edit',
						routerLink: '/settings/organization/application',
					},
					// {
					//     label: 'Subscription',
					//     icon: 'pi pi-credit-card',
					//     routerLink: '/settings/organization/subscription',
					// },
				],
			},
		];
	}

	public activeNav = output<string>();

	// protected readonly setActive = (route: string): void => {
	//     this.activeNav.emit(route);
	// };
}

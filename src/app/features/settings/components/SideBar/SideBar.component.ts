import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';


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
                ]
            },
            {
                label: 'Organization',
                icon: 'pi pi-building',
                routerLink: '/settings/organization',
                // command: () => this.setActive('organization'),
                items: [
                    {
                        label: 'Subscription',
                        icon: 'pi pi-credit-card',
                        routerLink: '/settings/organization/subscription',
                        // command: () => this.setActive('subscription')
                    },
                ],
            },

        ]
    }



    public activeNav = output<string>();

    // protected readonly setActive = (route: string): void => {
    //     this.activeNav.emit(route);
    // };


}

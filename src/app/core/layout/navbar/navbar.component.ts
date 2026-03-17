import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { UiModeService } from '../../services/ui-mode.service';


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
    // standalone: true,
    imports: [MenubarModule, ButtonModule]
})
export class NavbarComponent implements OnInit {

items: MenuItem[] | undefined;

    private readonly _uiModelService = inject(UiModeService)

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
           {
                label: 'Home',
                command: () => {
                    this.router.navigate(['']);
                }
                // icon: 'pi pi-home'
            },
            {
                label: 'Features',
                routerLink: 'features'
                // icon: 'pi pi-star'
            },
            {
                label: 'Contact',
                routerLink: 'contact'
                // icon: 'pi pi-envelope'
            },
            {
                label: 'About us',
                routerLink: 'about'
                // icon: 'pi pi-envelope'
            },
        ];
    }

    public toggleTheme():void {
        this._uiModelService.toggleDarkMode();
    }

    public isDarkMode(): boolean {
        return this._uiModelService.isDarkMode();
    }

}

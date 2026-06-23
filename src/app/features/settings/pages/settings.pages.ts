import { ChangeDetectionStrategy, Component, inject, OnInit, signal, } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { SplitterModule } from 'primeng/splitter';
import { MessageService } from 'primeng/api';
import { SideBarComponent } from '../components/SideBar/SideBar.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';



@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [ToastModule, SplitterModule, SideBarComponent, RouterOutlet],
    providers: [MessageService],
    templateUrl: './settings.pages.html',
    styleUrl: './settings.pages.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit {

    private readonly _breakpoint = inject(BreakpointObserver);
    protected readonly isSmallScreen = signal(false);
    protected readonly isMediumScreen = signal(false);

    public ngOnInit(): void {
    this._breakpoint.observe('(max-width: 768px)').subscribe((result) => {this.isSmallScreen.set(result.matches);});
    this._breakpoint.observe('(max-width: 1024px)').subscribe((result) => {this.isMediumScreen.set(result.matches);});

    }

    protected readonly activeNav = signal('personal-info');

    // protected changeNav(route: string) {
    //     this.activeNav.set(route);
    // }
}
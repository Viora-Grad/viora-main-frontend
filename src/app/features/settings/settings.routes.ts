import { Routes } from '@angular/router';
import { SettingsPage } from './pages/settings.pages';

export const SETTINGS_ROUTES: Routes = [
    {
        path: '',
        component: SettingsPage,
        children: [
            {
                path: '',
                redirectTo: 'personal-info',
                pathMatch: 'full',
            },
            {
                path: 'personal-info',
                loadComponent: () => import('./components/PersonalInfo/PersonalInfo.component').then((m) => m.PersonalInfoComponent),
            },
            {
                path: 'account-security/change-password',
                loadComponent: () =>
                    import('./components/ChangePassword/ChangePassword.component').then(
                        (m) => m.ChangePasswordComponent
                    ),
            },
            {
                path: 'organization',
                loadComponent: () =>
                    import('./components/organization/organization.component').then(
                        (m) => m.OrganizationComponent
                    ),
            },
            {
                path: 'organization/subscription',
                loadComponent: () =>
                    import('./components/subscription/subscription.component').then(
                        (m) => m.SubscriptionComponent
                    ),
            },
        ],
    },
];
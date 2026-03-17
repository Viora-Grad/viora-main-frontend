import { Routes } from '@angular/router';
export const routes: Routes = [
    {path: 'contact', loadChildren: () => import('./features/contact/contact.routes').then(m => m.CONTACT_ROUTES)},
];
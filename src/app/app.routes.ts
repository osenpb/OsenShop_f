import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.default),
  },
   {
    path: '**',
    redirectTo: 'auth/login',
  }
];

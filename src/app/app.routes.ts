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
    path: '**',
    redirectTo: 'auth/login',
  }
];

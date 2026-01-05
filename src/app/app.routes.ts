import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home/layout/home-layout/home-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: '',
    component: HomeLayoutComponent, // luego MainLayout y cambio el scope
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.routes'),
      },

      {
        path: 'order',
        loadChildren: () => import('./order/order.routes'),
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.routes'),
      },
    ]
  },
   {
    path: '**',
    redirectTo: 'auth/login',
  }
];

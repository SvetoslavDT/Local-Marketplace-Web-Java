import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page').then(m => m.DashboardPage),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-details-page/product-details-page').then(m => m.ProductDetailsPage),
  },
  {
    path: 'events/:id',
    loadComponent: () =>
      import('./pages/event-details-page/event-details-page').then(m => m.EventDetailsPage),
  },
];

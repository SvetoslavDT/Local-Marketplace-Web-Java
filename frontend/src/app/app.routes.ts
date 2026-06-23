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
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings-page/settings-page').then(m => m.SettingsPage),
  },
  {
    path: 'settings/:username',
    loadComponent: () =>
      import('./pages/settings-page/settings-page').then(m => m.SettingsPage),
  },
  {
    path: 'my-products/:username',
    loadComponent: () =>
      import('./pages/my-products-page/my-products-page').then(m => m.MyProductsPage),
  },
];

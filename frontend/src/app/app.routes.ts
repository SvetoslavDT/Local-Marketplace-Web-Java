import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/settings-page/settings-page').then(m => m.SettingsPage),
  },
  {
    path: 'settings/:username',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/settings-page/settings-page').then(m => m.SettingsPage),
  },
  {
    path: 'my-products/:username',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/my-products-page/my-products-page').then(m => m.MyProductsPage),
  },
  {
    path: 'my-events',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/my-events-page/my-events-page').then(m => m.MyEventsPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page').then(m => m.RegisterPage),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/cart-page/cart-page').then(m => m.CartPage),
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/checkout-page/checkout-page').then(m => m.CheckoutPage),
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/orders-page/orders-page').then(m => m.OrdersPage),
  },
];

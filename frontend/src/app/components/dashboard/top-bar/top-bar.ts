import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth/auth-service';
import { CartService } from '../../../core/services/cart/cart-service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  private readonly auth = inject(AuthService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly isLoggedIn = this.auth.isLoggedIn;
  readonly username = this.auth.currentUsername;
  readonly isVendor = this.auth.isVendor;
  readonly cartItemCount = this.cart.itemCount;

  homeClick = output<void>();

  onHome(): void {
    this.homeClick.emit();
  }

  onOrders(): void {
    this.router.navigate(['/orders']);
  }

  onCart(): void {
    this.router.navigate(['/cart']);
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/dashboard']);
  }
}

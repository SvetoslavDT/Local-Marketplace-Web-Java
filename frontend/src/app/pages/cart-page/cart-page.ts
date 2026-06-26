import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart-service';
import { CartDetailsDto } from '../../core/models/cart/cart-details.dto';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly cart = this.cartService.cart;
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    this.cartService.load().subscribe({
      next: () => this.loading.set(false),
      error: () => {
        this.error.set('Could not load cart.');
        this.loading.set(false);
      },
    });
  }

  formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(cents / 100);
  }

  onQuantityChange(itemId: number, event: Event): void {
    const qty = Number((event.target as HTMLInputElement).value);
    if (qty < 1) return;
    this.cartService.updateItem(itemId, qty).subscribe({
      error: () => this.error.set('Could not update quantity.'),
    });
  }

  onRemove(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe({
      error: () => this.error.set('Could not remove item.'),
    });
  }

  onClear(): void {
    this.cartService.clearCart().subscribe({
      error: () => this.error.set('Could not clear cart.'),
    });
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  trackById(_index: number, item: { id: number }): number {
    return item.id;
  }
}

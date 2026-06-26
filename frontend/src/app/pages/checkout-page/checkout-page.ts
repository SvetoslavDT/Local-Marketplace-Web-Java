import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart-service';
import { OrderService } from '../../core/services/order/order-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  readonly cart = this.cartService.cart;

  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    if (!this.cart()) {
      this.cartService.load().subscribe();
    }
  }

  formatPrice(cents: number): string {
    return (cents / 100).toFixed(2);
  }

  onConfirm(): void {
    this.error.set(null);
    this.loading.set(true);
    this.orderService.placeOrder({ currency: 'EUR' }).subscribe({
      next: () => {
        this.cartService.cart.set(null);
        this.router.navigate(['/orders']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.error.set('Your cart is empty. Add items before checking out.');
        } else if (err.status === 409) {
          this.error.set('One or more items are out of stock. Please update your cart.');
        } else {
          this.error.set('Could not place order. Please try again.');
        }
        this.loading.set(false);
      },
    });
  }
}

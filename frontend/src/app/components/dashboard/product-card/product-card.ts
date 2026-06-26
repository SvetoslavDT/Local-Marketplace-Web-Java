import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ProductDetailsDto } from "../../../core/models/product/product-details.dto";
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true
})
export class ProductCard {
  private readonly cartService = inject(CartService);

  product = input.required<ProductDetailsDto>();

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  }

  onAddToCart(): void {
    this.cartService.addItem(this.product().id, 1).subscribe({ error: () => {} });
  }
}

import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProductDetailsDto } from "../../../core/models/product/product-details.dto";

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true
})
export class ProductCard {

  product = input.required<ProductDetailsDto>();

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
}

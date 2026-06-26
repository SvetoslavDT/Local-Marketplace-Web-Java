import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailsDto } from "../../core/models/product/product-details.dto";
import { ProductService } from '../../core/services/product/product-service';
import { CartService } from '../../core/services/cart/cart-service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.css',
})
export class ProductDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  product = signal<ProductDetailsDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  entries = computed(() => {
    const value = this.product();
    if (!value) return [];
    return Object.entries(value).filter(([, v]) => v !== null && v !== undefined && v !== '');
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id)) {
      this.error.set('Invalid product id.');
      this.loading.set(false);
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: product => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load product.');
        this.loading.set(false);
      },
    });
  }

  formatKey(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/^./, c => c.toUpperCase());
  }

  formatValue(key: string, value: unknown): string {
    if (key === 'price' && typeof value === 'number') return this.formatPrice(value);
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  onAddToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cartService.addItem(p.id, 1).subscribe({ error: () => {} });
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCard } from '../../components/dashboard/product-card/product-card';
import { ProductDetailsDto } from '../../core/models/product/product-details.dto';
import { ProductService } from '../../core/services/product/product-service';

@Component({
  selector: 'app-my-products-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './my-products-page.html',
  styleUrl: './my-products-page.css',
})
export class MyProductsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  username = signal('');
  products = signal<ProductDetailsDto[]>([]);
  page = signal(0);
  totalPages = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.username.set(this.route.snapshot.paramMap.get('username') ?? '');
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.productService
      .searchProducts(
        { productTypes: [], makerUsername: this.username(), inStock: null },
        page,
        12
      )
      .subscribe({
        next: res => {
          this.products.set(res.content);
          this.page.set(res.number);
          this.totalPages.set(res.totalPages);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load your products.');
          this.loading.set(false);
        },
      });
  }

  prev(): void {
    if (this.page() > 0) this.loadPage(this.page() - 1);
  }

  next(): void {
    if (this.page() < this.totalPages() - 1) this.loadPage(this.page() + 1);
  }
}

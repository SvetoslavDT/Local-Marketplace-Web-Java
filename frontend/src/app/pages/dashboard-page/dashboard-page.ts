import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchMode, SidebarSearchPayload } from '../../core/models/sidebar-search.dto';
import { SearchCoordinator } from '../../core/services/search/search-coordinator';
import { ProductService } from '../../core/services/product/product-service';
import { EventService } from '../../core/services/event/event-service';
import { ProductCard } from '../../components/dashboard/product-card/product-card';
import { EventCard } from '../../components/dashboard/event-card/event-card';
import { ProductDetailsDto } from '../../core/models/product/product-details.dto';
import { EventDetailsDto } from '../../core/models/event/event-details.dto';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, ProductCard, EventCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly eventService = inject(EventService);

  activeMode = signal<SearchMode>('products');
  products = signal<ProductDetailsDto[]>([]);
  events = signal<EventDetailsDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    const coordinator = inject(SearchCoordinator);

    coordinator.searchRequested$
      .pipe(takeUntilDestroyed())
      .subscribe(payload => this.onSearch(payload));

    coordinator.resetRequested$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.loadAllProducts());
  }

  ngOnInit(): void {
    inject(SearchCoordinator).requestMode('products');
    this.loadAllProducts();
  }

  private loadAllProducts(): void {
    this.activeMode.set('products');
    this.loading.set(true);
    this.error.set(null);
    this.productService.searchProducts({ productTypes: [], makerUsername: '', inStock: null }).subscribe({
      next: page => {
        this.products.set(page.content);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load products.');
        this.loading.set(false);
      },
    });
  }

  onSearch(payload: SidebarSearchPayload): void {
    this.activeMode.set(payload.mode);
    this.loading.set(true);
    this.error.set(null);

    if (payload.mode === 'products' && payload.productFilters) {
      this.events.set([]);
      this.productService.searchProducts(payload.productFilters).subscribe({
        next: page => {
          this.products.set(page.content);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Could not load products.');
        }
      });
      return;
    }

    if (payload.mode === 'events' && payload.eventFilters) {
      this.products.set([]);
      this.eventService.getEvents(payload.eventFilters).subscribe({
        next: page => {
          this.events.set(page.content);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Could not load events.');
        }
      });
    }
  }
}

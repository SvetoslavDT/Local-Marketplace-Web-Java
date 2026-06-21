import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBar } from '../../components/dashboard/top-bar/top-bar';
import { FilterSidebar } from '../../components/dashboard/filter-sidebar/filter-sidebar';
import {SearchMode, SidebarSearchPayload} from '../../core/models/sidebar-search.dto'
import { ProductService } from "../../core/services/product/product-service";
import { EventService } from "../../core/services/event/event-service";
import { ProductCard } from '../../components/dashboard/product-card/product-card'
import { EventCard } from "../../components/dashboard/event-card/event-card";
import { ProductDetailsDto } from "../../core/models/product/product-details.dto";
import { EventDetailsDto } from "../../core/models/event/event-details.dto";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, TopBar, FilterSidebar, ProductCard, EventCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private readonly productService = inject(ProductService);
  private readonly eventService = inject(EventService);

  activeMode = signal<SearchMode>('products');
  products = signal<ProductDetailsDto[]>([]);
  events = signal<EventDetailsDto[]>([]);

  onSearch(payload: SidebarSearchPayload): void {
    this.activeMode.set(payload.mode);

    if (payload.mode === 'products' && payload.productFilters) {
      this.events.set([]);
      this.productService.searchProducts(payload.productFilters).subscribe(page => {
        this.products.set(page.content);
      });
      return;
    }

    if (payload.mode === 'events' && payload.eventFilters) {
      this.products.set([]);
      this.eventService.getEvents(payload.eventFilters).subscribe(page => {
        this.events.set(page.content);
      });
    }
  }
}

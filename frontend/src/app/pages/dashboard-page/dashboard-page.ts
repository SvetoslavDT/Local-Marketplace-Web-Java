import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBar } from '../../components/dashboard/top-bar/top-bar';
import { FilterSidebar } from '../../components/dashboard/filter-sidebar/filter-sidebar';
import {SidebarSearch} from '../../core/models/sidebar-search.dto'
import { ProductService } from "../../core/services/product/product";
import { EventService } from "../../core/services/event/event";
import { ProductCard } from '../../components/dashboard/product-card/product-card'

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule,
    TopBar,
    FilterSidebar, ProductCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  standalone: true
})
export class DashboardPage {
  private productService = inject(ProductService);
  private eventService = inject(EventService);

  products = signal<any[]>([]);
  events = signal<any[]>([]);

  onSearch(search: SidebarSearch): void {

    if (search.mode === 'products' && search.productFilters) {

      this.productService.getProducts(search.productFilters)
        .subscribe(res => {
          this.products.set(res.content);
        });

    } else if (search.mode === 'events' && search.eventFilters) {

      this.eventService.getEvents(search.eventFilters)
        .subscribe(res => {
          this.events.set(res.content);
        });
    }
  }
}

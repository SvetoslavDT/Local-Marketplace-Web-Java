import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Output, signal, output} from '@angular/core';
import { ProductType } from '../../../core/models/product/type';
import { EventType } from '../../../core/models/event/type';
import { EventFilters } from '../../../core/models/event/filters';
import { ProductFilters } from '../../../core/models/product/filters';

type SearchMode = 'events' | 'products';

export interface SidebarSearchPayload {
  mode: SearchMode;
  productFilters?: ProductFilters;
  eventFilters?: EventFilters;
}

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
  standalone: true
})
export class FilterSidebar {
  mode = signal<SearchMode>('products');

  selectedProductTypes = signal<ProductType[]>([]);
  makerUsername = signal('');
  inStockOnly = signal(false);

  selectedEventTypes = signal<EventType[]>([]);
  activeOnly = signal(false);
  upcomingOnly = signal(false);

  readonly productTypes = Object.values(ProductType);
  readonly eventTypes = Object.values(EventType);

  @Output()
  search = new EventEmitter<SidebarSearchPayload>();

  setMode(value: SearchMode): void {
    this.mode.set(value);
  }

  toggleProductType(type: ProductType): void {
    this.selectedProductTypes.update(current =>
      current.includes(type)
        ? current.filter(item => item !== type)
        : [...current, type]
    );
  }

  toggleEventType(type: EventType): void {
    this.selectedEventTypes.update(current =>
      current.includes(type)
        ? current.filter(item => item !== type)
        : [...current, type]
    );
  }

  onMakerUsernameInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.makerUsername.set(value);
  }

  toggleInStockOnly(): void {
    this.inStockOnly.update(value => !value);
  }

  toggleActiveOnly(): void {
    this.activeOnly.update(value => !value);
  }

  toggleUpcomingOnly(): void {
    this.upcomingOnly.update(value => !value);
  }

  runSearch(): void {
    if (this.mode() === 'products') {
      this.search.emit({
        mode: 'products',
        productFilters: {
          productTypes: this.selectedProductTypes(),
          makerUsername: this.makerUsername().trim(),
          inStock: this.inStockOnly() ? true : null,
        },
      });
      return;
    }

    this.search.emit({
      mode: 'events',
      eventFilters: {
        types: this.selectedEventTypes(),
        active: this.activeOnly() ? true : null,
        upcoming: this.upcomingOnly() ? true : null,
      },
    });
  }

  labelFromEnum(value: string): string {
    return value
      .toLowerCase()
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}

import {CommonModule} from '@angular/common';
import {Component, output, signal} from '@angular/core';

type SearchMode = 'events' | 'products';

export interface SidebarSearchFilters {
  mode: SearchMode;
  filters: string[];
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

  eventFilters = signal<string[]>([]);
  productFilters = signal<string[]>([]);

  search = output<SidebarSearchFilters>();

  readonly eventOptions = [];

  readonly productOptions = [];

  setMode(value: SearchMode) {
    this.mode.set(value);
  }

  toggleEventFilter(option: string) {
    this.eventFilters.update(current =>
      current.includes(option) ? current.filter(item => item !== option) : [...current, option]);
  }

  toggleProductFilter(option: string): void {
    this.productFilters.update(current =>
      current.includes(option) ? current.filter(item => item !== option) : [...current, option]
    );
  }

  runSearch(): void {
    this.search.emit({
      mode: this.mode(),
      filters: this.mode() === 'events' ? this.eventFilters() : this.productFilters()
    })
  }
}

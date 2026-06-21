import { ProductFilters } from './product/filters';
import { EventFilters } from './event/filters';

export type SearchMode = 'products' | 'events';

export interface SidebarSearchPayload {
  mode: SearchMode;
  productFilters?: ProductFilters;
  eventFilters?: EventFilters;
}

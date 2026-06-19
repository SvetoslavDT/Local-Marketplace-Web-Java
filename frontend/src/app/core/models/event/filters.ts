import { EventType } from './type';

export interface EventFilters {
  types: EventType[];
  active: boolean | null;
  upcoming: boolean | null;
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SidebarSearchPayload, SearchMode } from '../../models/sidebar-search.dto';

@Injectable({ providedIn: 'root' })
export class SearchCoordinator {
  readonly searchRequested$ = new Subject<SidebarSearchPayload>();
  readonly modeRequested$ = new Subject<SearchMode>();
  readonly resetRequested$ = new Subject<void>();

  requestSearch(payload: SidebarSearchPayload): void {
    this.searchRequested$.next(payload);
  }

  requestMode(mode: SearchMode): void {
    this.modeRequested$.next(mode);
  }

  requestReset(): void {
    this.resetRequested$.next();
  }
}

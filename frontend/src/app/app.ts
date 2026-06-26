import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './components/dashboard/top-bar/top-bar';
import { FilterSidebar } from './components/dashboard/filter-sidebar/filter-sidebar';
import { SearchCoordinator } from './core/services/search/search-coordinator';
import { SidebarSearchPayload } from './core/models/sidebar-search.dto';
import { AuthService } from './core/services/auth/auth-service';
import { CartService } from './core/services/cart/cart-service';

@Component({
  selector: 'app-root',
  imports: [FilterSidebar, TopBar, RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  private readonly searchCoordinator = inject(SearchCoordinator);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  constructor() {
    if (this.authService.isLoggedIn()) {
      this.cartService.load().subscribe({ error: () => {} });
    }
  }

  onSearch(payload: SidebarSearchPayload): void {
    this.searchCoordinator.requestSearch(payload);
  }

  onHomeClick(): void {
    this.searchCoordinator.requestReset();
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  standalone: true
})
export class DashboardPage {
  username = 'Svetoslav';
  isVendor = true;
  cartItemCount = 3;

  onPostProduct(): void {
    console.log('Open post product form');
  }

  onOrders(): void {
    console.log('Open orders page');
  }

  onCart(): void {
    console.log('Open cart page');
  }
}

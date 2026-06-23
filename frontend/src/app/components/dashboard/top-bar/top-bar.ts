import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  username = input<string>('');
  isVendor = input<boolean>(false);
  cartItemCount = input<number>(0);

  ordersClick = output<void>();
  cartClick = output<void>();

  logoutClick = output<void>();

  onLogout(): void {
    this.logoutClick().emit();
  }

  onOrders(): void {
    this.ordersClick.emit();
  }

  onCart(): void {
    this.cartClick.emit();
  }
}

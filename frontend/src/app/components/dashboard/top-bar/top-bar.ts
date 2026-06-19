import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  username = input<string>('');
  isVendor = input<boolean>(false);
  cartItemCount = input<number>(0);

  postProduct = output<void>();
  ordersClick = output<void>();
  cartClick = output<void>();

  onPostProduct(): void {
    this.postProduct.emit();
  }

  onOrders(): void {
    this.ordersClick.emit();
  }

  onCart(): void {
    this.cartClick.emit();
  }
}

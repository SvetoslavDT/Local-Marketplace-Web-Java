import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order/order-service';
import { OrderDetailsDto } from '../../core/models/order/order-details.dto';
import { PaymentMethod, PAYMENT_METHODS } from '../../core/models/order/payment-method';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage implements OnInit {
  private readonly orderService = inject(OrderService);

  orders = signal<OrderDetailsDto[]>([]);
  page = signal(0);
  totalPages = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  readonly paymentMethods = PAYMENT_METHODS;

  selectedMethod = signal<Record<number, PaymentMethod>>({});
  paying = signal<number | null>(null);
  payError = signal<Record<number, string>>({});

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(p: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.orderService.getMyOrders(p, 10).subscribe({
      next: res => {
        this.orders.set(res.content);
        this.page.set(res.number);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
        const defaults: Record<number, PaymentMethod> = {};
        res.content.forEach(o => { defaults[o.id] = 'CARD'; });
        this.selectedMethod.set(defaults);
      },
      error: () => {
        this.error.set('Could not load orders.');
        this.loading.set(false);
      },
    });
  }

  getMethod(orderId: number): PaymentMethod {
    return this.selectedMethod()[orderId] ?? 'CARD';
  }

  setMethod(orderId: number, method: PaymentMethod): void {
    this.selectedMethod.update(m => ({ ...m, [orderId]: method }));
  }

  onPay(orderId: number): void {
    this.paying.set(orderId);
    this.payError.update(e => ({ ...e, [orderId]: '' }));
    this.orderService.payOrder(orderId, this.getMethod(orderId)).subscribe({
      next: updated => {
        this.orders.update(list => list.map(o => o.id === orderId ? updated : o));
        this.paying.set(null);
      },
      error: () => {
        this.payError.update(e => ({ ...e, [orderId]: 'Payment failed. Please try again.' }));
        this.paying.set(null);
      },
    });
  }

  prev(): void {
    if (this.page() > 0) this.loadPage(this.page() - 1);
  }

  next(): void {
    if (this.page() < this.totalPages() - 1) this.loadPage(this.page() + 1);
  }

  formatTotal(cents: number): string {
    return (cents / 100).toFixed(2);
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  formatMethod(method: string): string {
    return method.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }
}

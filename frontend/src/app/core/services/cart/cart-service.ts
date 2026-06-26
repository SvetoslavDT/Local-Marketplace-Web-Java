import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartDetailsDto } from '../../models/cart/cart-details.dto';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly baseUrl = `${environment.apiUrl}/users/me/cart`;

  readonly cart = signal<CartDetailsDto | null>(null);
  readonly itemCount = computed(() =>
    this.cart()?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0
  );

  constructor(private readonly http: HttpClient) {}

  load(): Observable<CartDetailsDto> {
    return this.http.get<CartDetailsDto>(this.baseUrl).pipe(
      tap(cart => this.cart.set(cart))
    );
  }

  addItem(productId: number, quantity: number): Observable<CartDetailsDto> {
    return this.http.post<CartDetailsDto>(`${this.baseUrl}/items`, { productId, quantity }).pipe(
      tap(cart => this.cart.set(cart))
    );
  }

  updateItem(itemId: number, quantity: number): Observable<CartDetailsDto> {
    return this.http.put<CartDetailsDto>(`${this.baseUrl}/items/${itemId}`, { quantity }).pipe(
      tap(cart => this.cart.set(cart))
    );
  }

  removeItem(itemId: number): Observable<CartDetailsDto> {
    return this.http.delete<void>(`${this.baseUrl}/items/${itemId}`).pipe(
      switchMap(() => this.load())
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.baseUrl).pipe(
      tap(() => this.cart.set(null))
    );
  }
}

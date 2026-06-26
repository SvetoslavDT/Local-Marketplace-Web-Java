import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlaceOrderDto } from '../../models/order/place-order.dto';
import { OrderDetailsDto } from '../../models/order/order-details.dto';
import type { PaymentMethod } from '../../models/order/payment-method';
import { PageResponse } from '../../models/shared/page-response.dto';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  constructor(private readonly http: HttpClient) {}

  placeOrder(dto: PlaceOrderDto): Observable<OrderDetailsDto> {
    return this.http.post<OrderDetailsDto>(this.baseUrl, dto);
  }

  payOrder(id: number, paymentMethod: PaymentMethod): Observable<OrderDetailsDto> {
    return this.http.patch<OrderDetailsDto>(`${this.baseUrl}/${id}/pay`, { paymentMethod });
  }

  getMyOrders(page = 0, size = 10): Observable<PageResponse<OrderDetailsDto>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<OrderDetailsDto>>(this.baseUrl, { params });
  }
}

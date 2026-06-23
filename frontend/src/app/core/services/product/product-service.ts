import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductFilters } from '../../models/product/filters';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { PageResponse } from "../../models/shared/page-response.dto";
import { ProductDetailsDto } from "../../models/product/product-details.dto";

@Injectable({ providedIn: 'root' })
export class ProductService {

  private readonly baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  searchProducts(filters: ProductFilters, page = 0, size = 12): Observable<PageResponse<ProductDetailsDto>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    filters.productTypes.forEach(type => {
      params = params.append('productTypes', type);
    });

    if (filters.makerUsername?.trim()) {
      params = params.set('makerUsername', filters.makerUsername.trim());
    }

    if (filters.inStock !== null && filters.inStock !== undefined) {
      params = params.set('inStock', String(filters.inStock));
    }

    return this.http.get<PageResponse<ProductDetailsDto>>(this.baseUrl, { params });
  }

  getProductById(id: number): Observable<ProductDetailsDto> {
    return this.http.get<ProductDetailsDto>(`${this.baseUrl}/${id}`);
  }
}

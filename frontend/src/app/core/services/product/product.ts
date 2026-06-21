import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductFilters } from '../../models/product/filters';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(filters: ProductFilters): Observable<any> {

    let params = new HttpParams();

    if (filters.productTypes?.length) {
      filters.productTypes.forEach(t => {
        params = params.append('productTypes', t);
      });
    }

    if (filters.makerUsername) {
      params = params.set('makerUsername', filters.makerUsername);
    }

    if (filters.inStock !== null && filters.inStock !== undefined) {
      params = params.set('inStock', filters.inStock);
    }

    return this.http.get(this.baseUrl, { params });
  }
}

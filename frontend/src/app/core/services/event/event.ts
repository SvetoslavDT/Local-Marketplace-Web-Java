import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventFilters } from '../../models/event/filters';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {

  private baseUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getEvents(filters: EventFilters): Observable<any> {

    let params = new HttpParams();

    if (filters.types?.length) {
      filters.types.forEach(t => {
        params = params.append('types', t);
      });
    }

    if (filters.active !== null && filters.active !== undefined) {
      params = params.set('active', filters.active);
    }

    if (filters.upcoming !== null && filters.upcoming !== undefined) {
      params = params.set('upcoming', filters.upcoming);
    }

    return this.http.get(this.baseUrl, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventFilters } from '../../models/event/filters';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse } from '../../models/shared/page-response.dto';
import { EventDetailsDto } from '../../models/event/event-details.dto';
import { DiscountType } from '../../models/event/event-types.dto';

export interface CreateEventDto {
  title: string;
  description: string;
  type: string;
  active: boolean;
  content?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  discountType?: DiscountType;
  discountValue?: number;
}

export type UpdateEventDto = Partial<CreateEventDto>;

@Injectable({ providedIn: 'root' })
export class EventService {

  private baseUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getEvents(filters: EventFilters): Observable<PageResponse<EventDetailsDto>> {
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

    return this.http.get<PageResponse<EventDetailsDto>>(this.baseUrl, { params });
  }

  getEventById(id: number): Observable<EventDetailsDto> {
    return this.http.get<EventDetailsDto>(`${this.baseUrl}/${id}`);
  }

  createEvent(dto: CreateEventDto): Observable<EventDetailsDto> {
    return this.http.post<EventDetailsDto>(this.baseUrl, dto);
  }

  updateEvent(id: number, dto: UpdateEventDto): Observable<EventDetailsDto> {
    return this.http.put<EventDetailsDto>(`${this.baseUrl}/${id}`, dto);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

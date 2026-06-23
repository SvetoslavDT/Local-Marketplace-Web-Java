import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventDetailsDto } from '../../core/models/event/event-details.dto';
import { EventService } from '../../core/services/event/event-service';

@Component({
  selector: 'app-event-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-details-page.html',
  styleUrl: './event-details-page.css',
})
export class EventDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);

  event = signal<EventDetailsDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  entries = computed(() => {
    const value = this.event();
    if (!value) return [];
    return Object.entries(value).filter(([, v]) => v !== null && v !== undefined && v !== '');
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id)) {
      this.error.set('Invalid event id.');
      this.loading.set(false);
      return;
    }

    this.eventService.getEventById(id).subscribe({
      next: event => {
        this.event.set(event);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load event.');
        this.loading.set(false);
      },
    });
  }

  formatKey(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/^./, c => c.toUpperCase());
  }

  formatValue(value: unknown): string {
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }
}

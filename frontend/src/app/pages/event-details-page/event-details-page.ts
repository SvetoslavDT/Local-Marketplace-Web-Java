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

  readonly TYPE_CRAFT_FAIRS = 'CRAFT_FAIRS';
  readonly TYPE_PROMOTIONAL_CAMPAIGNS = 'PROMOTIONAL_CAMPAIGNS';
  readonly TYPE_STORYTELLING_FEATURES = 'STORYTELLING_FEATURES';

  coreEntries = computed(() => {
    const e = this.event();
    if (!e) return [];
    const CORE_KEYS: (keyof EventDetailsDto)[] = ['id', 'title', 'description', 'type', 'ownerUsername', 'active'];
    return CORE_KEYS.map(k => [k, e[k]] as [string, unknown]);
  });

  typeEntries = computed(() => {
    const e = this.event();
    if (!e) return [];
    const entries: [string, unknown][] = [];
    if (e.type === this.TYPE_CRAFT_FAIRS) {
      if (e.location) entries.push(['location', e.location]);
      if (e.startDate) entries.push(['startDate', e.startDate]);
      if (e.endDate) entries.push(['endDate', e.endDate]);
    } else if (e.type === this.TYPE_PROMOTIONAL_CAMPAIGNS) {
      if (e.discountType) entries.push(['discountType', e.discountType]);
      if (e.discountValue != null) entries.push(['discountValue', e.discountValue]);
      if (e.startDate) entries.push(['startDate', e.startDate]);
      if (e.endDate) entries.push(['endDate', e.endDate]);
    } else if (e.type === this.TYPE_STORYTELLING_FEATURES) {
      if (e.content) entries.push(['content', e.content]);
    }
    return entries;
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

  formatValue(key: string, value: unknown): string {
    if (key === 'startDate' || key === 'endDate') {
      return this.formatDate(String(value));
    }
    if (key === 'discountValue' && typeof value === 'number') {
      return `${(value / 100).toFixed(2)}`;
    }
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
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

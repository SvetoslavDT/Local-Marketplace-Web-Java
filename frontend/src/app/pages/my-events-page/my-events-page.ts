import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchCoordinator } from '../../core/services/search/search-coordinator';
import { EventFilters } from '../../core/models/event/filters';
import { EventDetailsDto } from '../../core/models/event/event-details.dto';
import { DiscountType } from '../../core/models/event/event-types.dto';
import { EventType } from '../../core/models/event/type';
import { EventService, CreateEventDto } from '../../core/services/event/event-service';
import { AuthService } from '../../core/services/auth/auth-service';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

interface EventForm {
  title: string;
  description: string;
  type: EventType | '';
  active: boolean;
  content: string;
  location: string;
  startDate: string;
  endDate: string;
  discountType: DiscountType | '';
  discountValueInput: string;
}

function emptyForm(): EventForm {
  return { title: '', description: '', type: '', active: true, content: '', location: '', startDate: '', endDate: '', discountType: '', discountValueInput: '' };
}

@Component({
  selector: 'app-my-events-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './my-events-page.html',
  styleUrl: './my-events-page.css',
})
export class MyEventsPage implements OnInit {
  @ViewChild('formPanel') formPanelRef?: ElementRef<HTMLElement>;

  private readonly eventService = inject(EventService);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly searchCoordinator = inject(SearchCoordinator);

  constructor() {
    this.searchCoordinator.searchRequested$
      .pipe(takeUntilDestroyed())
      .subscribe(payload => {
        if (payload.mode === 'events' && payload.eventFilters) {
          this.loadEvents(payload.eventFilters);
        }
      });
  }

  readonly EventType = EventType;
  readonly DiscountType = DiscountType;

  events = signal<EventDetailsDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  formError = signal<string | null>(null);
  formSaving = signal(false);

  showForm = signal(false);
  editingId = signal<number | null>(null);
  form = signal<EventForm>(emptyForm());

  get isCraftFair(): boolean { return this.form().type === EventType.CRAFT_FAIRS; }
  get isPromo(): boolean { return this.form().type === EventType.PROMOTIONAL_CAMPAIGNS; }
  get isStorytelling(): boolean { return this.form().type === EventType.STORYTELLING_FEATURES; }

  ngOnInit(): void {
    this.searchCoordinator.requestMode('events');
    this.loadEvents();
  }

  loadEvents(filters: EventFilters = { types: [], active: null, upcoming: null }): void {
    this.loading.set(true);
    this.error.set(null);
    this.eventService.getEvents(filters).subscribe({
      next: page => { this.events.set(page.content); this.loading.set(false); },
      error: () => { this.error.set('Could not load events.'); this.loading.set(false); },
    });
  }

  isOwner(e: EventDetailsDto): boolean {
    return e.ownerUsername === this.authService.currentUsername();
  }

  typeBadgeClass(type: string): string {
    if (type === EventType.CRAFT_FAIRS) return 'badge-blue';
    if (type === EventType.PROMOTIONAL_CAMPAIGNS) return 'badge-yellow';
    return 'badge-green';
  }

  formatType(type: string): string {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  formatDate(iso: string | null): string {
    if (!iso) return '—';
    return iso.replace('T', ' ').substring(0, 16);
  }

  formatDiscount(e: EventDetailsDto): string {
    if (e.discountType === DiscountType.PERCENTAGE) return `${(e.discountValue ?? 0) / 100}%`;
    if (e.discountType === DiscountType.FIXED_AMOUNT) return `£${((e.discountValue ?? 0) / 100).toFixed(2)}`;
    return 'Free Shipping';
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form.set(emptyForm());
    this.formError.set(null);
    this.showForm.set(true);
    setTimeout(() => this.formPanelRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  openEdit(event: EventDetailsDto): void {
    this.editingId.set(event.id);
    this.form.set({
      title: event.title,
      description: event.description,
      type: event.type as EventType,
      active: event.active,
      content: event.content ?? '',
      location: event.location ?? '',
      startDate: event.startDate ? event.startDate.slice(0, 16) : '',
      endDate: event.endDate ? event.endDate.slice(0, 16) : '',
      discountType: event.discountType ?? '',
      discountValueInput: event.discountValue != null ? String(event.discountValue / 100) : '',
    });
    this.formError.set(null);
    this.showForm.set(true);
    setTimeout(() => this.formPanelRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  closeForm(): void { this.showForm.set(false); }

  onTypeChange(type: string): void { this.form.update(f => ({ ...f, type: type as EventType })); }

  updateField<K extends keyof EventForm>(key: K, value: EventForm[K]): void {
    this.form.update(f => ({ ...f, [key]: value }));
  }

  save(): void {
    const f = this.form();
    if (!f.type) { this.formError.set('Please select a type.'); return; }
    this.formError.set(null);
    this.formSaving.set(true);

    const dto: CreateEventDto = { title: f.title, description: f.description, type: f.type, active: f.active };

    if (f.type === EventType.CRAFT_FAIRS) {
      if (f.location) dto.location = f.location;
      if (f.startDate) dto.startDate = f.startDate;
      if (f.endDate) dto.endDate = f.endDate;
    } else if (f.type === EventType.PROMOTIONAL_CAMPAIGNS) {
      if (f.discountType) dto.discountType = f.discountType as DiscountType;
      if (f.discountValueInput) dto.discountValue = Math.round(parseFloat(f.discountValueInput) * 100);
      if (f.startDate) dto.startDate = f.startDate;
      if (f.endDate) dto.endDate = f.endDate;
    } else if (f.type === EventType.STORYTELLING_FEATURES) {
      if (f.content) dto.content = f.content;
    }

    const id = this.editingId();
    const req = id != null ? this.eventService.updateEvent(id, dto) : this.eventService.createEvent(dto);

    req.subscribe({
      next: saved => {
        this.events.update(list => id != null ? list.map(e => e.id === id ? saved : e) : [...list, saved]);
        this.formSaving.set(false);
        this.showForm.set(false);
      },
      error: () => { this.formError.set('Failed to save event. Please try again.'); this.formSaving.set(false); },
    });
  }

  deleteEvent(event: EventDetailsDto): void {
    const ref = this.dialog.open(ConfirmDialog, {
      data: { title: 'Delete event?', message: `"${event.title}" will be permanently removed.`, confirmLabel: 'Delete', cancelLabel: 'Cancel' },
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.eventService.deleteEvent(event.id).subscribe({
        next: () => { this.events.update(list => list.filter(e => e.id !== event.id)); },
        error: () => { this.error.set('Could not delete event.'); },
      });
    });
  }
}

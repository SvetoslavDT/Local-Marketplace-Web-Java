import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventDetailsDto } from "../../../core/models/event/event-details.dto";

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  event = input.required<EventDetailsDto>();

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  }
}

import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [CommonModule, DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
  standalone: true
})
export class EventCard {

  event = input<any>();

}

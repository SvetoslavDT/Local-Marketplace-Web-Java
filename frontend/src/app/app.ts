import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopBar} from './components/dashboard/top-bar/top-bar';
import {FilterSidebar} from './components/dashboard/filter-sidebar/filter-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilterSidebar, TopBar],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('marketplace-frontend');
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopBar} from './components/dashboard/top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('marketplace-frontend');
}

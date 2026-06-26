import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth/auth-service';

function extractError(err: HttpErrorResponse): string {
  const body = err.error;
  if (body && typeof body === 'object') {
    if (body['errors'] && typeof body['errors'] === 'object') {
      return Object.entries(body['errors'] as Record<string, string>)
        .map(([f, m]) => `${f}: ${m}`)
        .join('\n');
    }
    if (typeof body['message'] === 'string') return body['message'];
  }
  return `Registration failed (${err.status}).`;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatInputModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMsg = signal('');

  form = this.fb.group({
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
  });

  submit(): void {
    if (this.form.invalid || this.loading()) return;
    this.errorMsg.set('');
    this.loading.set(true);

    const raw = this.form.getRawValue();
    this.authService.register({
      username: raw.username!,
      firstName: raw.firstName!,
      lastName: raw.lastName!,
      email: raw.email!,
      phone: raw.phone!,
      password: raw.password!,
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: unknown) => {
        this.loading.set(false);
        if (err instanceof HttpErrorResponse) {
          this.errorMsg.set(extractError(err));
        } else {
          this.errorMsg.set('Registration failed. Please try again.');
        }
      },
    });
  }
}

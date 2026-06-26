import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';

export function extractMessage(data: unknown, status: number): string {
  if (!data || typeof data !== 'object') return `Request failed (${status})`;

  const body = data as Record<string, unknown>;

  if (body['errors'] && typeof body['errors'] === 'object') {
    return Object.entries(body['errors'] as Record<string, string>)
      .map(([f, m]) => `${f}: ${m}`)
      .join('\n');
  }

  if (typeof body['message'] === 'string') return body['message'];

  return `Request failed (${status})`;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.token();
  const isAuthEndpoint = req.url.includes('/auth');

  const outgoing = token && !isAuthEndpoint
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(outgoing).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        auth.logout();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};

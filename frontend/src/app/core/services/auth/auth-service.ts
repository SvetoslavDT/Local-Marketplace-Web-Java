import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/auth/login-request.dto';
import { RegisterRequest } from '../../models/auth/register-request.dto';
import { AuthToken } from '../../models/auth/auth-token.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authUrl = '/auth';

  private readonly _token = signal<string | null>(localStorage.getItem('jwtToken'));
  private readonly _username = signal<string | null>(localStorage.getItem('username'));
  private readonly _userType = signal<string | null>(localStorage.getItem('userType'));

  readonly token = this._token.asReadonly();
  readonly currentUsername = this._username.asReadonly();
  readonly currentUserType = this._userType.asReadonly();
  readonly isVendor = computed(() => this._userType() === 'VENDOR');

  readonly isLoggedIn = computed(() => {
    const t = this._token();
    if (!t) return false;
    try {
      const payload = JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });

  register(req: RegisterRequest): Observable<unknown> {
    return this.http.post(`${this.authUrl}/register`, req);
  }

  login(req: LoginRequest): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.authUrl}/login`, req).pipe(
      tap(data => {
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userType', data.userType);
        this._token.set(data.token);
        this._username.set(data.username);
        this._userType.set(data.userType);
      })
    );
  }

  upgradeToVendor(): void {
    localStorage.setItem('userType', 'VENDOR');
    this._userType.set('VENDOR');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    this._token.set(null);
    this._username.set(null);
    this._userType.set(null);
    this.http.post(`${this.authUrl}/logout`, {}).subscribe({ error: () => {} });
  }
}

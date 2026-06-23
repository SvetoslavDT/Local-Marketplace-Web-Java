import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserDetailsDto } from "../../models/user/user-details.dto";
import { UpdateUserDto } from "../../models/user/user-update.dto";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(`${this.baseUrl}/${username}`);
  }

  updateUser(username: string, payload: UpdateUserDto): Observable<UserDetailsDto> {
    return this.http.put<UserDetailsDto>(`${this.baseUrl}/${username}`, payload);
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${username}`);
  }

  becomeVendor(): Observable<string> {
    return this.http.patch(`${this.baseUrl}/become-vendor`, {}, { responseType: 'text' });
  }
}

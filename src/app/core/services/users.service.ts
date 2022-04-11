import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // TODO: Update when users filters are ready on the backend
  checkEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`, {
      // params: { email: encodeURIComponent(email) },
      params: { email },
    });
  }
}
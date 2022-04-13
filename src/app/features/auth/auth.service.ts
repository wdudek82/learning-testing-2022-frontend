import { Injectable } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { Observable, tap } from 'rxjs';
import { User, UserData } from '../../core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private usersService: UsersService) {}

  checkEmail(email: string): Observable<User | void> {
    // TODO: Update this method when users filters are ready on the backend
    return this.http.get<User | void>(`${this.apiUrl}/users`, {
      params: { email },
    });
  }

  createUser(user: UserData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/create-user`, user);
  }

  signin(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/signin`, {
      email,
      password,
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { UsersService } from '@core/services/users.service';
import { User } from '@core/models';
import {
  SigninCredentials,
  SigninResponse,
  SignupCredentials,
  SignupResponse,
} from '@auth/models';

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

  createUser(user: SignupCredentials): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(
      `${this.apiUrl}/auth/create-user`,
      user,
    );
  }

  signin(credentials: SigninCredentials): Observable<SigninResponse> {
    // TODO: return only a username or id
    return this.http.post<SigninResponse>(
      `${this.apiUrl}/auth/signin`,
      credentials,
    );
  }
}

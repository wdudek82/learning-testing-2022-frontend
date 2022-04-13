import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  private signedInSubject = new BehaviorSubject<boolean>(false);
  signedIn$ = this.signedInSubject.asObservable();

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

  signIn(credentials: SigninCredentials): Observable<SigninResponse> {
    // TODO: return only a username or id
    return this.http
      .post<SigninResponse>(`${this.apiUrl}/auth/signin`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((data) => {
          this.signedInSubject.next(true);
          localStorage.setItem('user', JSON.stringify(data));
        }),
      );
  }

  signOut(): void {
    this.signedInSubject.next(false);
  }

  checkAuth(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/auth/whoami`, { withCredentials: true })
      .pipe(
        tap((res) => {
          console.log(res);
        }),
      );
  }
}

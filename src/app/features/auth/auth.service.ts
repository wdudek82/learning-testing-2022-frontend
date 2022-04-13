import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { UsersService } from '@core/services/users.service';
import { User } from '@core/models';
import {
  CheckAuthRes,
  SignInCredentials,
  SignInRes,
  SignUpCredentials,
  SignUpRes,
} from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private signedInSubject = new BehaviorSubject<Partial<User> | null>(null);
  signedIn$ = this.signedInSubject.asObservable();

  constructor(private http: HttpClient, private usersService: UsersService) {}

  checkEmail(email: string): Observable<User | void> {
    // TODO: Update this method when users filters are ready on the backend
    return this.http.get<User | void>(`${this.apiUrl}/users`, {
      params: { email },
    });
  }

  createUser(user: SignUpCredentials): Observable<SignUpRes> {
    return this.http.post<SignUpRes>(`${this.apiUrl}/auth/create-user`, user);
  }

  signIn(credentials: SignInCredentials): Observable<SignInRes> {
    // TODO: return only a username or id
    return this.http
      .post<SignInRes>(`${this.apiUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ name, email, role }) => {
          this.signedInSubject.next({ name, email, role });
        }),
      );
  }

  signOut(): void {
    this.signedInSubject.next(null);
  }

  checkAuth(): Observable<CheckAuthRes> {
    return this.http.get<CheckAuthRes>(`${this.apiUrl}/auth/whoami`).pipe(
      tap((res) => {
        const result = res.authenticated ? res.signedInUser : null;
        this.signedInSubject.next(result);
      }),
    );
  }
}

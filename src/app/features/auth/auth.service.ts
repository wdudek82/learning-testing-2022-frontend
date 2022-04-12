import { Injectable } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import {Observable, tap} from "rxjs";
import {User, UserData} from "../../core/models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private usersService: UsersService) {}

  // TODO: Update when users filters are ready on the backend
  checkEmail(email: string): Observable<User | void> {
    return this.http.get<User | void>(`${this.apiUrl}/users`, {
      params: { email },
    }).pipe(
      tap((value) => console.log(value)),
    );
  }

  createUser(user: UserData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/create-user`, user);
  }
}

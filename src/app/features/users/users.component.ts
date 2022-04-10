import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

interface User {
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  apiUrl = environment.apiUrl;
  usersColumns: string[] = [];
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<User[]>(this.apiUrl + '/users').subscribe((users) => {
      console.log(users);
      this.usersColumns = [
        'id',
        'name',
        'email',
        'role',
        'isActive',
        // 'createdAt',
        // 'updatedAt',
        // 'deletedAt',
      ];
      this.users = users || [];
    });
  }
}

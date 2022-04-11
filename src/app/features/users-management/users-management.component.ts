import {Component, OnInit} from '@angular/core';
import {User} from "../../core/models";
import {UsersService} from "../../core/services/users.service";

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  usersColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'isActive',
    // 'createdAt',
    // 'updatedAt',
    // 'deletedAt',
  ];
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}

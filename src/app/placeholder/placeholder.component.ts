import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogOverviewExample } from '../dialog-overview-example/dialog-overview-example.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface User {
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface Ticket {
  id: number | string;
  title: string;
  description: string;
  priority: string;
  status: string;
  position: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class PlaceholderComponent implements OnInit {
  title = 'learning-testing-2022-frontend';
  apiUrl = environment.apiUrl;
  usersColumns: string[] = [];
  users: User[] = [];
  ticketsDataSource: MatTableDataSource<any> = new MatTableDataSource<Ticket>();
  tickets: Ticket[] = [];
  ticketsColumns: string[] = [];
  expandedElement?: Ticket | null;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
    this.getTickets();
  }

  getUsers(): void {
    this.http.get<User[]>(this.apiUrl + '/users').subscribe((users) => {
      console.log(users);
      this.usersColumns = [
        'id',
        'name',
        'email',
        'role',
        // 'createdAt',
        // 'updatedAt',
        // 'deletedAt',
      ];
      this.users = users || [];
    });
  }

  getTickets(): void {
    this.http.get<Ticket[]>(this.apiUrl + '/tickets').subscribe((tickets) => {
      console.log(tickets);
      this.ticketsColumns = [
        'id',
        // 'position',
        'title',
        // 'description',
        'priority',
        'status',
        // 'createdAt',
        // 'updatedAt',
        // 'deletedAt',
      ];
      this.tickets = tickets || [];
      this.interpolateTicketsIds();
      this.recalculateTicketPositions();
      this.ticketsDataSource = new MatTableDataSource<Ticket>(tickets);
    });
  }

  interpolateTicketsIds(): void {
    this.tickets.map((t, index) => {
      t.id = `LT-${t.id}`;
      return t;
    });
  }

  recalculateTicketPositions(): void {
    this.tickets.map((t, index) => {
      t.position = index + 1;
      return t;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketsDataSource.filter = filterValue.trim().toLowerCase();
  }

  addData() {}

  // addData() {
  //   const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
  //   this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
  //   this.table.renderRows();
  // }
  // addData() {
  //   const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
  //   this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
  //   this.dataSource.setData(this.dataToDisplay);
  // }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
    this.recalculateTicketPositions();
    this.ticketsDataSource = new MatTableDataSource<any>(this.tickets);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExample, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed. Result: ${result}`);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TicketDetailsModalComponent } from '../ticket-details-modal/ticket-details-modal.component';
import { Ticket } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { User } from '@core/models';
import { PROJECT_ALIAS } from '@core/models/constants';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
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
export class BacklogComponent implements OnInit {
  title = 'learning-testing-2022-frontend';
  ticketsDataSource: MatTableDataSource<any> = new MatTableDataSource<Ticket>();
  tickets: Ticket[] = [];
  ticketsColumns: string[] = ['id', 'title', 'priority', 'status'];
  expandedElement?: Ticket | null;
  users: User[] = [];
  signedInUserId!: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getTickets();
    this.getUsers();
  }

  getTickets(): void {
    this.route.data.subscribe(({ tickets, users }) => {
      this.tickets = tickets;
      this.ticketsDataSource = new MatTableDataSource<Ticket>(this.tickets);
      // this.calculateTicketsPositions();
    });
  }

  getUsers(): void {
    this.route.data.subscribe(({ users, signedInUserId }) => {
      this.users = users;
      this.signedInUserId = signedInUserId;
    });
  }

  getTableCellValue(column: string, element: string): string {
    // TODO: The main function of this method id adding PROJECT_ALIAS before
    //  ticket id. Probably overkill/messy solution.
    //  Maybe directive would be better? Or pipe? Filter? What would be cleaner?
    return column === 'id' ? `${PROJECT_ALIAS}-${element}` : element;
  }

  calculateTicketsPositions(): void {
    this.tickets.map((t, index) => {
      t.position = index + 1;
      return t;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketsDataSource.filter = filterValue.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<string[]>) {
    // TODO: after successful drag and drop store new positions values in the Database
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
    this.calculateTicketsPositions();
    this.ticketsDataSource = new MatTableDataSource<any>(this.tickets);
  }

  createNewTicket(): void {
    const dialogConfig = {
      width: '700px',
      data: {
        tickets: this.tickets,
        users: this.users,
        authorId: this.signedInUserId,
      },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(
      TicketDetailsModalComponent,
      dialogConfig,
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed. Result: ${result}`);
      this.getTickets();
    });
  }

  updateTicket(): void {
    // TODO: Open modal with the existing ticket data
  }
}

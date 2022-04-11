import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogOverviewExample } from '../dialog-overview-example/dialog-overview-example.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { environment } from '../../../../../environments/environment';
import {TicketDetailsModalComponent} from "../ticket-details-modal/ticket-details-modal.component";

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
  apiUrl = environment.apiUrl;
  ticketsDataSource: MatTableDataSource<any> = new MatTableDataSource<Ticket>();
  tickets: Ticket[] = [];
  ticketsColumns: string[] = [
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
  expandedElement?: Ticket | null;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.http.get<Ticket[]>(this.apiUrl + '/tickets').subscribe((tickets) => {
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
    const dialogRef = this.dialog.open(TicketDetailsModalComponent, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed. Result: ${result}`);
    });
  }
}

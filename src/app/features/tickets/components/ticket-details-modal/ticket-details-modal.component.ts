import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ticket} from "../../models";
import {map, Observable, Subscriber, Subscription} from "rxjs";
import {User} from "../../../../core/models";
import {UsersService} from "../../../../core/services/users.service";

@Component({
  selector: 'app-ticket-details-modal',
  templateUrl: './ticket-details-modal.component.html',
  styleUrls: ['./ticket-details-modal.component.scss']
})
export class TicketDetailsModalComponent implements OnInit, OnDestroy {
  @Input() ticket?: Ticket;
  prioritiesOptions: any[] = [
    {value: 'very low', viewValue: 'very low'},
    {value: 'low', viewValue: 'low'},
    {value: 'normal', viewValue: 'normal'},
    {value: 'high', viewValue: 'high'},
    {value: 'vary high', viewValue: 'vary high'},
  ];
  usersOptions: any[] = [];
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl(this.prioritiesOptions[2].value),
    assignee: new FormControl(''),
    relatedTicket: new FormControl(''),
  });
  private subs = new Subscription();
  private users$: Observable<User[]> = new Observable<User[]>();

  constructor(
    public dialogRef: MatDialogRef<TicketDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.subs.add();
    this.getUsers();
    this.getUsersOptions();
  }

  getUsers(): void {
    this.users$ = this.usersService.getUsers();
  }

  getUsersOptions(): void {
    // TODO: Move this to a resolver.
    this.users$.subscribe((users) => {
      this.usersOptions = users.map((u) => ({ value: u.name, viewValue: u.name }));
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getErrorMessage(name: string) {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

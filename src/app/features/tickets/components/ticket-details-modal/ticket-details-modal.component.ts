import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Ticket } from "../../models";
import { Observable, Subscription } from "rxjs";
import { User } from "../../../../core/models";
import { UsersService } from "../../../../core/services/users.service";
import { TicketsService } from "../../tickets.service";

@Component({
  selector: 'app-ticket-details-modal',
  templateUrl: './ticket-details-modal.component.html',
  styleUrls: ['./ticket-details-modal.component.scss'],
})
export class TicketDetailsModalComponent implements OnInit, OnDestroy {
  @Input() ticket?: Ticket;
  prioritiesOptions: any[] = [
    { value: 'very_low', viewValue: 'very low' },
    { value: 'low', viewValue: 'low' },
    { value: 'normal', viewValue: 'normal' },
    { value: 'high', viewValue: 'high' },
    { value: 'very_high', viewValue: 'very high' },
  ];
  usersOptions: any[] = [];
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
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
    private ticketsService: TicketsService,
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
      this.usersOptions = users.map((u) => ({
        value: u.id,
        viewValue: u.name,
      }));
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    // TODO: When authentication is implemented this should be an id of currently signed in user.
    const nawTicket = {
      ...this.form.value,
      authorId: 5,
    }
    this.ticketsService.createTicket(nawTicket).subscribe(() => {
      this.onClose();
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getErrorMessage(name: string) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '@core/models';
import { Priority, Ticket, TicketStatus } from '@tickets/models';
import { TicketsService } from '@tickets/tickets.service';
import { FormService } from '@core/services/form.service';
import { PROJECT_ALIAS } from '@core/models/constants';

export interface TicketModalData {
  tickets: Ticket[];
  ticket?: Ticket;
  users: User[];
  authorId: number;
}

interface SelectOption {
  value: number | string;
  viewValue: string;
}

@Component({
  selector: 'app-ticket-details-modal',
  templateUrl: './ticket-details-modal.component.html',
  styleUrls: ['./ticket-details-modal.component.scss'],
})
export class TicketDetailsModalComponent implements OnInit {
  priorityOptions: SelectOption[] = this.createSelectOptionsFromStringsArray([
    Priority.VERY_LOW,
    Priority.LOW,
    Priority.NORMAL,
    Priority.HIGH,
    Priority.VERY_HIGH,
  ]);
  statusOptions: SelectOption[] = this.createSelectOptionsFromStringsArray([
    TicketStatus.NEW,
    TicketStatus.TO_DO,
    TicketStatus.IN_DESIGN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.IN_REVIEW,
    TicketStatus.TESTING,
    TicketStatus.DONE,
    TicketStatus.CANCELLED,
  ]);
  ticketsOptions: SelectOption[] = [];
  usersOptions: SelectOption[] = [];
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TicketModalData,
    public dialogRef: MatDialogRef<TicketDetailsModalComponent>,
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private formService: FormService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.ticketsOptions = this.createTicketsOptions(this.data.tickets);
    this.usersOptions = this.createUsersOptions(this.data.users);
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      authorId: [
        {
          value: this.data.authorId,
          disabled: true,
        },
      ],
      assigneeId: [-1],
      status: [
        {
          value: this.statusOptions[0].value,
          disabled: !this.data.ticket
        },
      ],
      priority: [this.priorityOptions[2].value],
      description: [''],
      relatedTicket: [''],
    });
  }

  get title(): AbstractControl {
    return this.form.get('title')!;
  }

  createSelectOptionsFromStringsArray(values: string[]): SelectOption[] {
    const result = [];
    for (const value of values) {
      result.push({ value, viewValue: value.replace(/_/g, ' ') });
    }
    return result;
  }

  createUsersOptions(users: User[]): SelectOption[] {
    const empty: SelectOption = {value: -1, viewValue: '-'};
    const result: SelectOption[] = users.map((u) => ({
      value: u.id,
      viewValue: u.name,
    }));
    return [empty, ...result];
  }

  createTicketsOptions(tickets: Ticket[]): SelectOption[] {
    return tickets.map((t) => ({
      value: t.id,
      viewValue: `${PROJECT_ALIAS}-${t.id} ${t.title}`,
    }));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const newTicket = this.form.getRawValue();

    // This is needed because of the workaround. Null assigneeId could not be used
    // as a default value in the mat-select dropdown, and -1 had to be used instead.
    // But -1 in this case signify that no assignee has been selected,
    // and in such case backend expects "null" value.
    newTicket.assigneeId = newTicket.assigneeId === -1 ? null : newTicket.assigneeId;

    this.ticketsService.createTicket(newTicket).subscribe({
      next: (ticket) => {
        this.onClose();
        this.data.tickets.push(ticket);
        this.toastr.success('A new ticket has been created', 'Success');
      },
      error: (_err) => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getInputErrorMessage(control: AbstractControl): string {
    return this.formService.getInputErrorMessage(control);
  }
}

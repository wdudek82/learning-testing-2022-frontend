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
import { FormService } from '@core/services/form.service';
import { PROJECT_ALIAS } from '@core/models/constants';
import { Priority, Ticket, TicketStatus } from '@tickets/models';
import { TicketsService } from '@tickets/tickets.service';

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
    TicketStatus.DESIGN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.REVIEW,
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
    this.createForm();
    this.ticketsOptions = this.createTicketsOptions(this.data.tickets);
    this.usersOptions = this.createUsersOptions(this.data.users);
  }

  get title(): AbstractControl {
    return this.form.get('title')!;
  }

  createForm(): void {
    const { ticket, authorId } = this.data;
    this.form = this.formBuilder.group({
      title: [
        ticket?.title ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      authorId: [
        {
          value: authorId,
          disabled: true,
        },
      ],
      assigneeId: [ticket?.assigneeId ?? -1],
      status: [
        {
          value: ticket?.status ?? this.statusOptions[0].value,
          disabled: !ticket,
        },
      ],
      priority: [ticket?.priority ?? this.priorityOptions[2].value],
      description: [ticket?.description ?? ''],
      relatedTicketId: [ticket?.relatedTicketId ?? -1],
    });
  }

  createSelectOptionsFromStringsArray(values: string[]): SelectOption[] {
    const result = [];
    for (const value of values) {
      result.push({ value, viewValue: value.replace(/_/g, ' ') });
    }
    return result;
  }

  createUsersOptions(users: User[]): SelectOption[] {
    const empty: SelectOption = { value: -1, viewValue: '-' };
    const result: SelectOption[] = users.map((u) => ({
      value: u.id,
      viewValue: u.name,
    }));
    return [empty, ...result];
  }

  createTicketsOptions(tickets: Ticket[]): SelectOption[] {
    const empty: SelectOption = { value: -1, viewValue: '-' };
    const result = tickets.map((t) => ({
      value: t.id,
      viewValue: `${PROJECT_ALIAS}-${t.id} ${t.title}`,
    }));
    return [empty, ...result];
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const ticketForm = this.form.getRawValue();

    // An id of -1 is only a placeholder for null value. This is needed because null cannot be used
    // as a default value in mat-select dropdown, and -1 has to be used instead.
    // But it would not be recognised by the backend.
    const { assigneeId, relatedTicketId } = ticketForm;
    ticketForm.assigneeId = assigneeId === -1 ? null : assigneeId;
    ticketForm.relatedTicketId = relatedTicketId === -1 ? null : relatedTicketId;

    const { ticket } = this.data;
    let submitAction$ = ticket
      ? this.ticketsService.updateTicket(+ticket.id, ticketForm)
      : this.ticketsService.createTicket(ticketForm)

    submitAction$.subscribe({
      next: (ticket) => {
        this.onClose();

        if (ticket) {
          // this.data.tickets.push(ticket);
          this.toastr.success('The new ticket has been created', 'Success');
        } else {
          this.toastr.success('The ticket has been updated', 'Success');
        }
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

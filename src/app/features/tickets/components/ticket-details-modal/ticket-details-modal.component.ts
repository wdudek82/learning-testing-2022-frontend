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
import { Ticket } from '@tickets/models';
import { TicketsService } from '@tickets/tickets.service';
import { FormService } from '@core/services/form.service';

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
  prioritiesOptions: SelectOption[] = [
    { value: 'very_low', viewValue: 'very low' },
    { value: 'low', viewValue: 'low' },
    { value: 'normal', viewValue: 'normal' },
    { value: 'high', viewValue: 'high' },
    { value: 'very_high', viewValue: 'very high' },
  ];
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
    this.ticketsOptions = this.getTicketsOptions(this.data.tickets);
    this.usersOptions = this.getUsersOptions(this.data.users);
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
      assigneeId: [null],
      priority: [this.prioritiesOptions[2].value],
      description: [''],
      relatedTicket: [''],
    });
  }

  get title(): AbstractControl {
    return this.form.get('title')!;
  }

  getUsersOptions(users: User[]): SelectOption[] {
    return users.map((u) => ({
      value: u.id,
      viewValue: u.name,
    }));
  }

  getTicketsOptions(tickets: Ticket[]): SelectOption[] {
    return tickets.map((t) => ({
      value: t.id,
      viewValue: `${t.id} ${t.title}`,
    }));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const newTicket = this.form.getRawValue();
    this.ticketsService.createTicket(newTicket).subscribe({
      next: () => {
        this.onClose();
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

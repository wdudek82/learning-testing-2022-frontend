import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Ticket} from "./models";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor() { }

  getTickets(): Observable<Ticket[]> {
    return of();
  }

  getTicketById(id: number): Observable<Ticket> {
    return of();
  }
}

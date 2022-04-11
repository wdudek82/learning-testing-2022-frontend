import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Ticket} from "./models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl + '/tickets');
  }

  getTicketById(id: number): Observable<Ticket> {
    return of();
  }

  createTicket(ticket: Ticket): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tickets`, ticket);
  }
}

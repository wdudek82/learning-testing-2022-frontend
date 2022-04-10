import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { DialogOverviewExample } from './components/dialog-overview-example/dialog-overview-example.component';

@NgModule({
  declarations: [
    BacklogComponent,
    BoardComponent,
    DialogOverviewExample,
  ],
  imports: [SharedModule, TicketsRoutingModule],
})
export class TicketsModule {}

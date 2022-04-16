import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { AuthGuard } from '@auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BacklogComponent,
    pathMatch: 'full',
  },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}

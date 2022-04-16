import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersManagementComponent } from './users-management.component';
import { AuthGuard } from '@auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagementRoutingModule {}

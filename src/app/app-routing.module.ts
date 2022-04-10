import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { BacklogComponent } from './backlog/backlog.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  {
    path: 'tickets',
    children: [
      { path: '', component: PlaceholderComponent },
      { path: 'board', component: BacklogComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SigninComponent },
  {
    path: '**',
    redirectTo: 'tickets', // TODO: Create dedicated HTTP 404 Not Found page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

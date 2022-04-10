import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./features/tickets/tickets.module').then((m) => m.TicketsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
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

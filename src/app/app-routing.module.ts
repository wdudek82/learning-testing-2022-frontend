import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/auth.guard';
import { SignupComponent } from '@auth/signup/signup.component';
import { SigninComponent } from '@auth/signin/signin.component';
import { HomeComponent } from '@core/components/home/home.component';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    pathMatch: 'full',
    redirectTo: 'auth/signin',
  },
  {
    path: 'auth',
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
    ],
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
      import('./features/users-management/users-management.module').then(
        (m) => m.UsersManagementModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

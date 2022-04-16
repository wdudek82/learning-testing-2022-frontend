import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@core/components/home/home.component';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { SignupComponent } from '@auth/signup/signup.component';
import { SigninComponent } from '@auth/signin/signin.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { SignedInGuard } from '@auth/guards/signed-in.guard';
import { SignoutComponent } from '@auth/signout/signout.component';

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
      { path: 'signout', component: SignoutComponent },
    ],
    canActivate: [SignedInGuard],
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./features/tickets/tickets.module').then((m) => m.TicketsModule),
    // TODO: add tickets resolver
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users-management/users-management.module').then(
        (m) => m.UsersManagementModule,
      ),
    // TODO: add users resolver
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

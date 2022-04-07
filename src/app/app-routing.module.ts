import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tickets',
  },
  {
    path: 'tickets',
    children: [
      { path: '', component: PlaceholderComponent },
      { path: 'board', component: PlaceholderComponent },
    ]
  },
  {
    path: 'users',
    component: PlaceholderComponent,
  },
  {
    path: 'about',
    component: PlaceholderComponent,
  },
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

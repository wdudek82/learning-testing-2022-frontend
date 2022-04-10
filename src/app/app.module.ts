import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { DialogOverviewExample } from './dialog-overview-example/dialog-overview-example.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { BoardComponent } from './board/board.component';
import { BacklogComponent } from './backlog/backlog.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [CoreModule, AppRoutingModule, MatCardModule, FormsModule],
  declarations: [AppComponent, PlaceholderComponent, DialogOverviewExample, SigninComponent, SignupComponent, AboutComponent, BoardComponent, BacklogComponent, UsersComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

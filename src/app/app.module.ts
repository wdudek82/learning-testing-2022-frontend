import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  imports: [CoreModule, AppRoutingModule, SharedModule],
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AboutComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

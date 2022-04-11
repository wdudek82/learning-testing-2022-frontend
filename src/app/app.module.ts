import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthModule } from "./features/auth/auth.module";

@NgModule({
  imports: [CoreModule, AppRoutingModule, AuthModule],
  declarations: [
    AppComponent,
    AboutComponent,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

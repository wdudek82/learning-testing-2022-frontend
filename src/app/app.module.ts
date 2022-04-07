import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { PlaceholderComponent } from './placeholder/placeholder.component';

@NgModule({
  declarations: [AppComponent, PlaceholderComponent],
  imports: [CoreModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

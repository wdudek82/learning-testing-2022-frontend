import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '@core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  signedIn$!: Observable<Partial<User> | null>;

  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedInUser$;
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe();
  }
}

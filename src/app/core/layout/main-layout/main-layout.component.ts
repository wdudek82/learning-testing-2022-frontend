import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@core/models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  isAuthenticated$ = new Observable<Partial<User> | null>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.signedIn$;
  }

  signout() {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/signin');
  }
}

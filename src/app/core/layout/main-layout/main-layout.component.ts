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
  signedIn$!: Observable<Partial<User> | null>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signedIn$ = this.authService.signedIn$;
  }

  signOut() {
    this.authService.signOut().subscribe();
    this.router.navigateByUrl('/auth/signin');
  }
}

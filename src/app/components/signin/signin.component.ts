import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  isLoginValid = true;
  username = '';
  password = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('submit');
    this.isLoginValid = false;
  }
}

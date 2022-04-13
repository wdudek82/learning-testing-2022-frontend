import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from '@core/services/form.service';
import { InputType } from '@shared/models/form';
import { AuthService } from '@auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  get inputType(): InputType {
    return this.hidePassword ? 'password' : 'text';
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formService.getErrorMessage(control);
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.authService.signin(email, password).subscribe({
      next: (res) => {
        console.log('logged in:', res);
        this.toastr.success('You are now logged in', 'Welcome!');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }
}

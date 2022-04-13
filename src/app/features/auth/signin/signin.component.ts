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

  getInputErrorMessage(control: AbstractControl): string {
    return this.formService.getInputErrorMessage(control);
  }

  getFormErrorMessage(): string {
    return this.formService.getFormErrorMessage(this.form);
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.invalid) return;
    this.authService.signin(this.form.value).subscribe({
      next: (res) => {
        this.toastr.success('You are now logged in', 'Welcome!');
      },
      error: (err) => {
        console.log(err.status);
        switch (err.status) {
          case 404:
            this.form.setErrors({ accountNotFound: true });
            break;
          case 400:
            this.form.setErrors({ incorrectPassword: true });
            break;
          case 0:
            this.toastr.error('No internet connection', 'Connection Error');
            break;
          default:
            this.toastr.error('Something went wrong', 'Error');
        }
      },
    });
  }
}

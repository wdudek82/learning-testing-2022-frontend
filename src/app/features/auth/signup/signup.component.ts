import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '@core/services/form.service';
import { InputType } from '@shared/models/form';
import { MatchPasswordValidator } from '../validators/match-password.validator';
import { UniqueEmailValidator } from '../validators/unique-email.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private uniqueEmailValidator: UniqueEmailValidator,
    private authService: AuthService,
    private formService: FormService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[\w ]+$/),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          // Validators.pattern(/^$/),
        ],
      ],
      passwordConfirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          // Validators.pattern(/^$/),
        ],
      ],
    });
  }

  get name(): AbstractControl {
    return this.form.get('name')!;
  }

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  get passwordConfirmation(): AbstractControl {
    return this.form.get('passwordConfirmation')!;
  }

  get inputType(): InputType {
    return this.hidePassword ? 'password' : 'text';
  }

  getInputErrorMessage(control: AbstractControl): string {
    return this.formService.getInputErrorMessage(control);
  }

  onSubmit() {
    // TODO: Add loading indicator to email (async validation)
    // TODO: Add loading indicator when signup form is submitted
    // TODO: On success: Redirect to "success"
    // TODO: On error: reset form and show error notification
    if (this.form.invalid) return;
    this.form.disable();

    this.authService.createUser(this.form.value).subscribe({
      next: (_res) => {
        this.toastr.success('A new account has been created!', 'Success');
        this.form.enable();
        this.form.reset();
        // this.authForm.markAsPristine();
        // this.authForm.markAsUntouched();
        // this.authForm.updateValueAndValidity();
      },
      error: (err) => {
        console.log(err.status)

        let title = err?.error?.error ? err.error.error : 'Error';
        let message = 'Something went wrong';
        if (err?.error?.message) {
          const errorMsg = err.error.message;
          message = Array.isArray(errorMsg) ? errorMsg.join('<br>') : errorMsg;
        }
        this.toastr.error(message, title);
        this.form.enable();
      },
    });
  }

  toggleHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}

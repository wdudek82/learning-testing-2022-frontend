import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatchPasswordValidator } from '../validators/match-password.validator';
import { UniqueEmailValidator } from '../validators/unique-email.validator';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  authForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[\w ]+$/),
      ]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
        ],
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        // Validators.pattern(/^$/),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        // Validators.pattern(/^$/),
      ]),
      // role: new FormControl(),
      // isActive: new FormControl(),
    },
    { validators: [new MatchPasswordValidator().validate] },
  );
  hidePassword = true;

  get name(): AbstractControl | null {
    return this.authForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.authForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.authForm.get('password');
  }

  get passwordConfirmation(): AbstractControl | null {
    return this.authForm.get('passwordConfirmation');
  }
  get inputType(): string {
    return this.hidePassword ? 'password' : 'text';
  }

  constructor(
    private uniqueEmailValidator: UniqueEmailValidator,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  getErrorMessage(control: AbstractControl | null): string {
    if (control?.hasError('required')) {
      return 'Field is required';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control?.getError('minlength')['requiredLength'];
      return `Provided value is too short (should be at least ${requiredLength} characters)`;
    }
    if (control?.hasError('maxlength')) {
      const requiredLength = control?.getError('maxlength')['requiredLength'];
      return `Provided value is too long (should be at most ${requiredLength} characters)`;
    }
    if (control?.hasError('pattern')) {
      return 'Incorrect format';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    if (control?.hasError('emailIsNotUnique')) {
      return 'E-mail address is already in use';
    }

    return '';
  }

  onSubmit() {
    // TODO: Add loading indicator to email (async validation)
    // TODO: Add loading indicator when signup form is submitted
    // TODO: On success: Redirect to "success"
    // TODO: On error: reset form and show error notification
    this.authForm.disable();

    if (this.authForm.invalid) return;

    this.authService.createUser(this.authForm.value).subscribe({
      next: (res) => {
        this.toastr.success('A new account has been created!', 'Success');
        this.authForm.reset();
        this.authForm.enable();
      },
      error: (err) => {
        this.toastr.error('Something went wrong', 'Error');
        this.authForm.enable();
      },
    });
  }

  toggleHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}

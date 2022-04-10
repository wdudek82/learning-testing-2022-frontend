import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { MatchPassword } from '../validators/match-password';

enum FormControlNames {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRMATION = 'passwordConfirmation',
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formControlNames = FormControlNames;
  authForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^\w+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
    { validators: [this.matchPassword.validate] },
  );

  get email(): AbstractControl | null {
    return this.authForm.get('email');
  }

  constructor(private matchPassword: MatchPassword) {}

  ngOnInit(): void {}

  getErrorMessage(name: FormControlNames): string {
    const formControl: AbstractControl | null = this.authForm.get(name);
    if (formControl?.hasError('required')) {
      return 'Field is required';
    }
    if (formControl?.hasError('minlength')) {
      const requiredLength =
        formControl?.getError('minlength')['requiredLength'];
      return `Provided value is too short (should be at least ${requiredLength} characters)`;
    }
    if (formControl?.hasError('maxlength')) {
      const requiredLength =
        formControl?.getError('maxlength')['requiredLength'];
      return `Provided value is too long (should be at most ${requiredLength} characters)`;
    }
    if (formControl?.hasError('pattern')) {
      return 'Incorrect format';
    }
    if (formControl?.hasError('email')) {
      return 'Not a valid email';
    }
    // console.log('name:', name, 'authForm errors:', this.authForm.errors);
    // (name === this.formControlNames.PASSWORD ||
    //   name === this.formControlNames.PASSWORD_CONFIRMATION) &&
    // if (this.authForm.hasError('passwordsDontMatch')) {
    //   return "Passwords don't match";
    // }
    return '';
  }
}

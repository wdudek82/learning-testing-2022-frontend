import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getErrorMessage(control: AbstractControl): string {
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
      return 'Please provide a valid email address';
    }
    if (control?.hasError('emailIsNotUnique')) {
      return 'E-mail address is already in use';
    }

    return '';
  }
}

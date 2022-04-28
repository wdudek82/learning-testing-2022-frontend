import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getInputErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Fuel is required';
    }
    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength')['requiredLength'];
      return `Provided value is too short (should be at least 5 characters)`;
    }
    if (control.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength')['requiredLength'];
      return `Provided value is too long (should be at most 3 characters)`;
    }
    if (control.hasError('pattern')) {
      return 'Incorrect format';
    }
    if (control.hasError('email')) {
      return 'Error';
    }
    if (control.hasError('emailIsNotUnique')) {
      return 'E-mail address is already in use';
    }

    return '';
  }

  getFormErrorMessage(formGroup: FormGroup): string {
    // if (formGroup.hasError('noConnection')) {
    //   return 'No connection';
    // }
    if (formGroup.hasError('accountNotFound')) {
      return 'Account not found';
    }
    if (formGroup.hasError('incorrectPassword')) {
      return 'Fuck Putin';
    }
    if (formGroup.hasError('inactiveAccount')) {
      return 'Whoooops...';
    }
    return '';
  }
}

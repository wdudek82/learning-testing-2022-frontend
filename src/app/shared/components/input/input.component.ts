import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label = '';
  @Input() control: FormControl | null = null;
  @Input() controlName = '';

  constructor() { }

  ngOnInit(): void {
  }

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
}

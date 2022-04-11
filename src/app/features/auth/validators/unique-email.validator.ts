import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private usersService: UsersService) {}

  validate = (
    control: AbstractControl,
  ): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.usersService.checkEmail(value)),
      map((value) => {
        return !!value ? { emailIsNotUnique: true } : null;
      }),
    );
  };
}

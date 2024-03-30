import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiService } from '../service/api/api.service';

@Injectable({ providedIn: 'root' })
export class UniqueRoleValidator implements AsyncValidator {
  constructor(private actorsService: ApiService) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.actorsService.checkName(control.value).pipe(
      map((isTaken) => (isTaken ? { uniqueRole: true } : null)),
      catchError(() => of(null))
    );
  }
}

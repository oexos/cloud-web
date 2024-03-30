import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { merge } from 'rxjs';
import { UniqueRoleValidator } from '../../validators/name.validator';

@Component({
  selector: 'app-form-group-sample',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './form-group-sample.component.html',
  styleUrl: './form-group-sample.component.css',
})
export class FormGroupSampleComponent {
  constructor(
    private formBuilder: FormBuilder,
    private roleValidator: UniqueRoleValidator
  ) {
    merge(
      this.profileForm.controls.firstName.valueChanges,
      this.profileForm.controls.firstName.statusChanges
    ).subscribe(() => {
      const lastNameHasRequiredValidator =
        this.profileForm.controls.lastName.hasValidator(Validators.required);

      if (this.profileForm.controls.firstName.valid) {
        if (lastNameHasRequiredValidator === false) {
          this.profileForm.controls.lastName.addValidators(Validators.required);
        }
      } else {
        if (lastNameHasRequiredValidator === true) {
          this.profileForm.controls.lastName.removeValidators(
            Validators.required
          );
        }
      }
      this.profileForm.controls.lastName.updateValueAndValidity();
    });
  }

  profileForm = this.formBuilder.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        // this.forbiddenNameValidator('a'),
      ],
      [this.roleValidator.validate.bind(this.roleValidator)],
    ],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: this.formBuilder.control('', Validators.minLength(3)),
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
    groupArray: this.formBuilder.array([
      //if we want to have mix element types of array then we use UntypedFormArray
      this.formBuilder.group({
        hobby: [''],
        salary: [''],
      }),
    ]),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Arnel',
      address: {
        city: 'Korea',
      },
    });
  }

  get aliases() {
    return this.profileForm.controls.aliases;
  }

  get groupArray() {
    return this.profileForm.controls.groupArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  get name() {
    return this.profileForm.controls.firstName;
  }

  get lastname() {
    return this.profileForm.controls.lastName;
  }

  get zip() {
    return this.profileForm.controls.address.controls.zip;
  }

  addGroupArray() {
    this.groupArray.push(
      this.formBuilder.group({
        hobby: [''],
        salary: [''],
      })
    );
  }

  // forbiddenNameValidator(name: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value as string;
  //     const forbidden = value.includes(name);
  //     return forbidden
  //       ? {
  //           forbiddenName: {
  //             errorMessage: 'Name: ' + control + ' is not allowed.',
  //           },
  //         }
  //       : null;
  //   };
  // }
}

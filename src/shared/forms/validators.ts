import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const minLength = (length: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const target = control.value;
    return target && target.length < length
      ? {
          length: {
            msg: `You should enter at least ${length} characters`,
          },
        }
      : null;
  };
};

export const required = (control: AbstractControl): ValidationErrors | null => {
  return control.value
    ? null
    : {
        required: {
          msg: 'This field is required',
        },
      };
};

export const email = (control: AbstractControl): ValidationErrors | null => {
  return Validators.email(control) ? { email: { msg: 'Invalid email' } } : null;
};

export const onlyAlphabet = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value && Validators.pattern(/^[a-zA-Z]+$/)(control)
    ? { onlyAlphabet: { msg: 'Only english alphabet characters allowed' } }
    : null;
};

export const matchTwoPasswordFields = (
  firstFieldName: string,
  secondFieldName: string
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstField = control.get(firstFieldName);
    const secondField = control.get(secondFieldName);
    return firstField && secondField && firstField.value !== secondField.value
      ? {
          passwordMatch: {
            msg: "Passwords don't match",
          },
        }
      : null;
  };
};

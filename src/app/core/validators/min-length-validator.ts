import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value && control.value.length < minLength) {
      return { minLength: { requiredLength: minLength, actualLength: control.value.length } };
    }

    return null;
  };
}

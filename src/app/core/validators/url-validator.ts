import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const { value } = control;

    if (value && !urlRegex.test(value)) {

      return { invalidUrl: true };
    }

    return null;
  };
}

import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function equalValidate(target: string, reverse: boolean = false): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let targetControl = control.root.get(target);

    if (!targetControl) {
      return null;
    }

    if (!targetControl.value && targetControl.invalid && control.dirty) {
      control.setValidators(Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]));
      targetControl.setValidators(equalValidate('confirmPassword'));
      // console.log(1);
    } else {
      if (control.value !== targetControl.value) {
        if (reverse) {
          // console.log(2);
          targetControl.setErrors({ 'equalValidate': false });
        } else {
          // console.log(3);
          return { 'equalValidate': false };
        }
      } else if (reverse && targetControl.errors.equalValidate) {
        // console.log(4);
        targetControl.setErrors(null);
      }
    }
    return null;
  }
}

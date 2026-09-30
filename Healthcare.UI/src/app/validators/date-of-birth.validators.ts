import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function dateOfBirthValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    // HTML date input should return yyyy-MM-dd
    const dateParts = value.split('-');

    if (dateParts.length !== 3) {
      return {
        invalidDate: true
      };
    }

    const year = Number(dateParts[0]);
    const month = Number(dateParts[1]);
    const day = Number(dateParts[2]);

    if (!year || !month || !day) {
      return {
        invalidDate: true
      };
    }

    // Create today's date as yyyy-MM-dd
    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    // Compare dates without time-zone conversion
    if (
      year > todayYear ||
      (year === todayYear && month > todayMonth) ||
      (year === todayYear &&
        month === todayMonth &&
        day >= todayDay)
    ) {
      return {
        futureOrToday: true
      };
    }

    return null;
  };
}
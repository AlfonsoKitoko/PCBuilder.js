import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class Validator {
	passwordMatchValidator(passwordField: string, passwordFieldRepeat: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const password = control.get(passwordField)?.value;
			const passwordRepeat = control.get(passwordFieldRepeat)?.value;

			// Si ambos están vacíos, no validamos (permite edición sin cambiar pass)
			if (!password && !passwordRepeat) return null;

			return password !== passwordRepeat ? { passwordMismatch: true } : null;
		};
	}

	nofutureDateValidator(control: AbstractControl) {
		const selectedDate = new Date(control.value);
		const currentDate = new Date();

		currentDate.setHours(0, 0, 0, 0);
		selectedDate.setHours(0, 0, 0, 0);
		return selectedDate <= currentDate ? null : { futureDate: true };
	}
}

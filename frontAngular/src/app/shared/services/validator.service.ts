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

	birthDateValidator(control: AbstractControl): ValidationErrors | null {
		if (!control.value) return null;

		const selectedDate = new Date(control.value);
		const currentDate = new Date();

		currentDate.setHours(0, 0, 0, 0);
		selectedDate.setHours(0, 0, 0, 0);

		if (selectedDate > currentDate) return { futureDate: true };

		const minYear = currentDate.getFullYear() - 100;
		if (selectedDate.getFullYear() < minYear) return { unrealisticDate: true };

		return null;
	}
}

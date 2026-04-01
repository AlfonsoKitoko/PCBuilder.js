import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

@Injectable({ providedIn: 'root' })
export class Validator {
	passwordMatchValidator(
		passwordField: string = 'password',
		passwordFieldRepeat: string = 'passwordRepeat'
	): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const password = control.get(passwordField)
			const passwordRepeat = control.get(passwordFieldRepeat)

			return password && passwordRepeat && password.value !== passwordRepeat.value
				? { passwordMismatch: true }
				: null
		}
	}

	nofuruteDateValidator(control: AbstractControl) {
		const selectedDate = new Date(control.value)
		const currentDate = new Date()

		currentDate.setHours(0, 0, 0, 0)
		selectedDate.setHours(0, 0, 0, 0)
		return selectedDate <= currentDate ? null : { futureDate: true }
	}
}

import { Component, inject, signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Validator } from '../../../../shared/services/validator.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { Router } from '@angular/router'
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../../../shared/constants/patterns'

@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule],
	templateUrl: './register.html',
})
export default class Register {
	private readonly fb = inject(FormBuilder);
	private readonly validator = inject(Validator);
	protected readonly authService = inject(AuthService);
	private readonly router = inject(Router);

	isLoading = signal<boolean>(false);
	errorMessage = signal<string | null>(null);

	registerForm: FormGroup = this.fb.group(
		{
			username: [, [Validators.required]],
			firstName: [, [Validators.minLength(2), Validators.maxLength(50)]],
			lastName: [, [Validators.minLength(2), Validators.maxLength(50)]],
			email: [, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
			password: [, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
			passwordRepeat: [, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
			birthDate: [, [this.validator.nofuruteDateValidator]],
		},
		{ validators: [this.validator.passwordMatchValidator()] }
	);

	onRegister() {
		if (this.registerForm.valid) {
			this.isLoading.set(true)
			this.errorMessage.set(null)

			const { passwordRepeat, ...registerData } = this.registerForm.value
			this.authService.register(registerData).subscribe({
				next: () => this.router.navigate(['/']),
				error: (err) => {
					this.isLoading.set(false)
					this.errorMessage.set(err.error?.message || ' Error al registrarse. Por favor, inténtalo de nuevo.')
				}
			})
		}
	}
}

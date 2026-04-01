import { Component, inject, signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Validator } from '../../../../shared/services/validator.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { Router } from '@angular/router'
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../../../shared/constants/patterns'

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule],
	templateUrl: './login.html',
})
export default class Login {
	private readonly fb = inject(FormBuilder);
	private readonly validator = inject(Validator);
	protected readonly authService = inject(AuthService);
	private readonly router = inject(Router);

	isLoading = signal<boolean>(false);
	errorMessage = signal<string | null>(null);

	loginForm: FormGroup = this.fb.group({
		email: [, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
		password: [, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]]
	});

	onLogin() {
		if (this.loginForm.valid) {
			this.isLoading.set(false)
			this.errorMessage.set(null)

			const { ...loginData } = this.loginForm.value

			this.authService.login(loginData).subscribe({
				next: () => this.router.navigate(['/']),
				error: (err) => {
					this.isLoading.set(false)
					this.errorMessage.set(err.error?.message || ' Error al iniciar sesión. Por favor, inténtalo de nuevo.')
				}
			})
		}
	}
}

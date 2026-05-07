import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../../../shared/constants/patterns';
import { AuthService } from '../../../../shared/services/auth.service';
import { Validator } from '../../../../shared/services/validator.service';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './login.html',
})
export default class Login {
	private readonly fb = inject(FormBuilder);
	private readonly validator = inject(Validator);
	protected readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	isLoading = signal<boolean>(false);
	errorMessage = signal<string | null>(null);

	loginForm: FormGroup = this.fb.group({
		email: [, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
		password: [, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
	});

	onLogin() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		this.isLoading.set(true);
		this.errorMessage.set(null);

		const { ...loginData } = this.loginForm.value;

		this.authService.login(loginData).subscribe({
			next: () => {
				this.isLoading.set(false);

				// Nos permite 'volver' a la página que se estaba ANTES del login
				const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
				this.router.navigateByUrl(returnUrl);
			},
			error: (err) => {
				this.isLoading.set(false);
				this.errorMessage.set(
					err.error?.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo en unos minutos.',
				);
			},
		});
	}
}

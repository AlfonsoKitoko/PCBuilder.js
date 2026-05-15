import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../../../shared/constants/patterns';
import { AuthService } from '../../../../shared/services/auth.service';
import { Validator } from '../../../../shared/services/validator.service';

@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule, RouterLink],
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
			repeatPassword: [, [Validators.required]],
			birthDate: [, [this.validator.nofutureDateValidator]],
		},
		{ validators: [this.validator.passwordMatchValidator('password', 'repeatPassword')] },
	);

	onRegister() {
		// Bloquea los intentos extra si ya está cargando
		if (this.isLoading()) return;

		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}

		this.errorMessage.set(null);
		this.isLoading.set(true);

		const { passwordRepeat, ...registerData } = this.registerForm.value;

		this.authService.register(registerData).subscribe({
			next: () => {
				this.isLoading.set(false);
				this.router.navigate(['/']);
			},
			error: (err) => {
				this.isLoading.set(false);
				this.errorMessage.set(err.error?.message || ' Error al registrarse. Por favor, inténtalo de nuevo.');
				setTimeout(() => this.errorMessage.set(null), 5000);
			},
		});
	}
}

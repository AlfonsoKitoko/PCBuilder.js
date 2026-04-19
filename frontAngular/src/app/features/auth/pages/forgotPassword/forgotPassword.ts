import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EMAIL_PATTERN } from '../../../../shared/constants/patterns';
import { AuthService } from '../../../../shared/services/auth.service';
import { Validator } from '../../../../shared/services/validator.service';

@Component({
	selector: 'app-forgot-password',
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './forgotPassword.html',
})
export default class ForgotPassword {
	private readonly fb = inject(FormBuilder);
	private readonly validator = inject(Validator);
	private readonly authService = inject(AuthService);

	isLoading = signal<boolean>(false);
	errorMessage = signal<string | null>(null);
	isSent = signal<boolean>(false);

	forgotForm: FormGroup = this.fb.group({
		email: [, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
	});

	onSend() {
		if (this.forgotForm.invalid) {
			this.forgotForm.markAllAsTouched();
			return;
		}

		this.isLoading.set(true);
		this.errorMessage.set(null);

		const emailValue = this.forgotForm.value;

		this.authService.forgotPassword(emailValue).subscribe({
			next: () => {
				this.isLoading.set(false);
				this.isSent.set(true);
			},
			error: (err) => {
				this.isLoading.set(false);
				this.errorMessage.set(err.error?.message || 'Error al mandar el correo. Por favor inténtalo de nuevo en unos minutos.');
			},
		});
	}
}

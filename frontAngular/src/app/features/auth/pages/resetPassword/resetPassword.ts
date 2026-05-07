import { Component, inject, signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { PASSWORD_PATTERN } from '../../../../shared/constants/patterns'
import { AuthService } from '../../../../shared/services/auth.service'
import { Validator } from '../../../../shared/services/validator.service'

@Component({
	selector: 'app-reset-password',
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './resetPassword.html',
})
export default class ResetPassword {
	private readonly fb = inject(FormBuilder);
	private readonly validator = inject(Validator);
	private readonly authService = inject(AuthService);
	private readonly route = inject(ActivatedRoute);

	isLoading = signal<boolean>(false);
	isVerifying = signal<boolean>(true)
	errorMessage = signal<string | null>(null);
	isSent = signal<boolean>(false);
	isTokenValid = signal<boolean>(false)
	token: string = '';

	resetForm: FormGroup = this.fb.group(
		{
			password: [, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
			repeatPassword: [, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
		},
		{ validators: [this.validator.passwordMatchValidator()] },
	);
	ngOnInit(): void {
		this.token = this.route.snapshot.params['token']

		if (!this.token) {
			this.errorMessage.set('Enlace de recuperación inválido o expirado.')
			return
		}

		this.verifyToken()
	}

	verifyToken() {
		this.authService.verifyResetToken(this.token).subscribe({
			next: () => {
				this.isVerifying.set(false)
				this.isTokenValid.set(true)
			},
			error: (err) => {
				this.isVerifying.set(false)
				this.errorMessage.set(err.error?.message || 'Enlace expirado o inválido')
			}
		})
	}

	onSend() {
		if (this.resetForm.invalid || !this.isTokenValid()) {
			this.resetForm.markAllAsTouched()
			return
		}

		this.isLoading.set(true)
		this.errorMessage.set(null)

		const { password } = this.resetForm.value

		this.authService.resetPassword(this.token, { password }).subscribe({
			next: () => {
				this.isLoading.set(false)
				this.isSent.set(true)
			},
			error: (err) => {
				this.isLoading.set(false)
				this.errorMessage.set(err.error?.message || 'Error al actualizar la contraseña. Por favor inténtalo de nuevo en unos minutos.')
			},
		})
	}
}

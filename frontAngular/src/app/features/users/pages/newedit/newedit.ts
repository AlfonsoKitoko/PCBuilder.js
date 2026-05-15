import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PASSWORD_PATTERN } from '../../../../shared/constants/patterns';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserService } from '../../../../shared/services/user.service';
import { Validator } from '../../../../shared/services/validator.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-newedit',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	templateUrl: './newedit.html',
})
export default class NewEdit implements OnInit {
	id = input<string>();
	slug = input<string>();

	private readonly fb = inject(FormBuilder);
	private readonly userService = inject(UserService);
	private readonly authService = inject(AuthService);
	private readonly validator = inject(Validator);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;
	readonly userProfiles = Object.values(userProfile);

	isLoading = this.userService.isLoading;
	isEditMode = computed(() => !!this.id());

	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => {
		const currentUser = this.authService.user();
		if (!currentUser) return false;

		const isAdmin = this.managementRoles.includes(currentUser.profile as userProfile);
		const isSelfEdit = this.isEditMode() && currentUser._id === this.id();

		return isAdmin || isSelfEdit;
	});

	// En newedit.ts
	form: FormGroup = this.fb.group(
		{
			username: [, [Validators.required, Validators.minLength(3)]],
			// Usamos una función para determinar los validadores
			password: [
				'',
				this.isEditMode()
					? [Validators.pattern(PASSWORD_PATTERN)] // Solo validará SI hay algo escrito
					: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
			],
			repeatPassword: [
				'',
				this.isEditMode()
					? [Validators.pattern(PASSWORD_PATTERN)]
					: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
			],
			firstName: [],
			lastName: [],
			email: [, [Validators.required, Validators.email]],
			birthDate: [, [Validators.required, this.validator.nofutureDateValidator]],
			profile: [userProfile.USER, [Validators.required]],
		},
		{
			validators: [this.validator.passwordMatchValidator('password', 'repeatPassword')],
		},
	);

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para realizar esta acción', 'error');
			this.router.navigate(['/user/all']);
			return;
		}

		if (this.isEditMode()) {
			this.userService.getById(this.id()!).subscribe({
				next: (res) => {
					// Aseguramos que la fecha tenga el formato YYYY-MM-DD para el input tipo date
					const data = {
						...res.data,
						birthDate: res.data.birthDate ? res.data.birthDate.split('T')[0] : '',
					};
					this.form.patchValue(data);
					const currentUser = this.authService.user();
					if (currentUser && currentUser.profile !== userProfile.ADMIN) {
						this.form.get('profile')?.disable();
					}
				},
				error: () => {
					this.toast.show('Error al buscar el usuario', 'error');
					this.router.navigate(['/user/all']);
				},
			});
		}
	}

	async onSubmit() {
		// 1. Si estamos editando y no se ha escrito NADA en los campos de pass
		if (this.isEditMode()) {
			const p = this.form.get('password');
			const r = this.form.get('repeatPassword');

			if (!p?.value && !r?.value) {
				// Quitamos temporalmente los validadores para que el formulario sea válido
				p?.clearValidators();
				r?.clearValidators();
			} else {
				// Si hay algo, nos aseguramos de que tengan el patrón (por si lo borramos antes)
				p?.setValidators([Validators.pattern(PASSWORD_PATTERN)]);
				r?.setValidators([Validators.pattern(PASSWORD_PATTERN)]);
			}
			// Actualizamos el estado de salud de los inputs
			p?.updateValueAndValidity();
			r?.updateValueAndValidity();
		}

		// 2. Ahora comprobamos la validez
		if (this.form.invalid || !this.canManage()) {
			// Debug para ver qué campo está fallando exactamente
			Object.keys(this.form.controls).forEach((key) => {
				const controlErrors = this.form.get(key)?.errors;
				if (controlErrors) console.log('Campo con error:', key, controlErrors);
			});

			this.form.markAllAsTouched();
			return;
		}

		const action = this.isEditMode() ? 'actualizar' : 'crear';

		const confirmed = await this.modal.confirm({
			title: `¿Confirmar ${action}?`,
			message: `¿Estás seguro de que deseas ${action} los datos?`,
			confirmLabel: 'Aceptar',
			cancelLabel: 'cancelar',
		});

		if (confirmed) {
			this.isLoading.set(true);
			const data = this.form.getRawValue();

			delete data.repeatPassword;

			// Si estamos editando y el password está vacío, lo eliminamos para no sobreescribirlo
			if (this.isEditMode() && !data.password) {
				delete data.password;
			}

			const request = this.isEditMode() ? this.userService.update(this.id()!, data) : this.userService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Usuario actualizado' : 'Usuario creado correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/user/all']);
				},
				error: (err) => {
					this.isLoading.set(false);
					this.toast.show(err.error?.message || 'Error en la operación', 'error');
				},
			});
		}
	}
}

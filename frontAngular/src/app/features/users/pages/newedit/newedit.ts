import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserService } from '../../../../shared/services/user.service';
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
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;
	readonly userProfiles = Object.values(userProfile);

	isLoading = this.userService.isLoading;
	isEditMode = computed(() => !!this.id());

	managementRoles = [userProfile.ADMIN];

	form: FormGroup = this.fb.group({
		username: ['', [Validators.required, Validators.minLength(3)]],
		password: ['', [this.isEditMode() ? Validators.nullValidator : Validators.required]],
		firstName: [''],
		lastName: [''],
		email: ['', [Validators.required, Validators.email]],
		birthDate: ['', [Validators.required]],
		profile: [userProfile.USER, [Validators.required]],
	});

	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	});

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar usuarios', 'error');
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
				},
				error: () => {
					this.toast.show('Error al buscar el usuario', 'error');
					this.router.navigate(['/user/all']);
				},
			});
		}
	}

	async onSubmit() {
		if (this.form.invalid || !this.canManage()) {
			this.form.markAllAsTouched();
			return;
		}

		const action = this.isEditMode() ? 'actualizar' : 'crear';

		const confirmed = await this.modal.confirm({
			title: `¿Confirmar ${action}?`,
			message: `¿Estás seguro de que deseas ${action} esta caja?`,
			confirmLabel: 'Aceptar',
			cancelLabel: 'Cancelat',
		});

		if (confirmed) {
			this.isLoading.set(true);
			const data = this.form.getRawValue();

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

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { osMode } from '../../../../shared/constants/index.constant';
import { userProfile } from '../../../../shared/models/user.model'; //
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { OsService } from '../../../../shared/services/os.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-newedit',
	imports: [CommonModule, ReactiveFormsModule, RouterModule, CurrencyPipe, DecimalPipe],
	templateUrl: './newedit.html',
})
export default class NewEdit implements OnInit {
	id = input<string>();
	slug = input<string>();

	private readonly fb = inject(FormBuilder);
	private readonly osService = inject(OsService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.osService.isLoading;
	isEditMode = computed(() => !!this.id());
	selectedOs = this.osService.selectedOs;

	managementRoles = [userProfile.ADMIN]; //

	osModes = Object.values(osMode);

	form: FormGroup = this.fb.group({
		manufacturer: ['', [Validators.required]],
		version: ['', [Validators.required]],
		edition: ['', [Validators.required]],
		mode: ['', [Validators.required]],
		price: ['', [Validators.required, Validators.min(0)]],
	});

	// Propiedad computada para verificar el permiso de forma reactiva
	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	});

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar tarjeta gráfica', 'error');
			this.router.navigate(['/os/all']);
			return;
		}

		if (this.isEditMode()) {
			this.osService.selectedOs.set(null);
			this.osService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea GHz y Euros
					console.log(this.selectedOs());
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar el Sistema Operativo (OS)', 'error');
					this.router.navigate(['/os/all']);
				},
			});
		}
	}

	async onSubmit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.toast.show('Por favor, rellena los campos obligatorios', 'error');
			return;
		}

		if (!this.canManage()) return;

		const action = this.isEditMode() ? 'actualizar' : 'crear';

		const confirmed = await this.modal.confirm({
			title: `¿Confirmar ${action}?`,
			message: `¿Estás seguro de que deseas ${action} este Sistema Operativo?`,
			confirmLabel: 'Aceptar',
			cancelLabel: 'cancelar',
		});

		if (confirmed) {
			this.isLoading.set(true);

			// Transformamos de vuelta para MongoDB (Euros -> Céntimos, L -> cL)
			const rawValue = this.form.getRawValue();
			const data = {
				...rawValue,
				price: Math.round(rawValue.price * 100),
			};

			const request = this.isEditMode() ? this.osService.update(this.id()!, data) : this.osService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Cambios guardados' : 'Sistema Operativo (OS) creada correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/os/all']);
				},
				error: (err) => {
					this.isLoading.set(false);
					this.toast.show(err.error?.message || 'Error en la operación', 'error');
				},
			});
		}
	}

	async onCancel() {
		if (this.form.pristine) {
			this.router.navigate(['/os/all']);
			return;
		}

		const response = await this.modal.confirm({
			title: `¿Descartar cambios?`,
			message: `¿Estás seguro de que deseas salir sin guardar?`,
		});

		if (response && response.confirmed) {
			this.router.navigate(['/os/all']);
		}
	}
}

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ramSize, ramType } from '../../../../shared/constants/index.constant';
import { userProfile } from '../../../../shared/models/user.model'; //
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { RamService } from '../../../../shared/services/ram.service';
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
	private readonly ramService = inject(RamService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.ramService.isLoading;
	isEditMode = computed(() => !!this.id());
	selectedRam = this.ramService.selectedRam;

	// Configuración de roles permitidos (igual que en tu archivo de Builds)
	managementRoles = [userProfile.ADMIN]; //

	ramTypes = Object.values(ramType);
	ramSizes = Object.values(ramSize);

	form: FormGroup = this.fb.group({
		manufacturer: ['', [Validators.required]],
		model: ['', [Validators.required]],
		ram_type: ['', [Validators.required]],
		modules: this.fb.group({
			size: [0, [Validators.required]],
			quantity: [0, [Validators.required, Validators.min(1)]],
		}),
		speed: [0, [Validators.required]],
		cas_latency: [0, [Validators.required]],
		voltage: [0, [Validators.required]],
		price: [0, [Validators.required, Validators.min(0)]],
	});

	// Propiedad computada para verificar el permiso de forma reactiva
	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	});

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar ram', 'error');
			this.router.navigate(['/ram/all']);
			return;
		}

		if (this.isEditMode()) {
			this.ramService.selectedRam.set(null);
			this.ramService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea GHz y Euros
					console.log(this.selectedRam());
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
						modules: res.data.modules && res.data.modules.length > 0 ? res.data.modules[0] : { size: '', quantity: 1 },
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar la RAM (RAM)', 'error');
					this.router.navigate(['/ram/all']);
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

			// Transformamos de vuelta para MongoDB (Euros -> Céntimos, L -> cL)
			const rawValue = this.form.getRawValue();
			const data = {
				...rawValue,
				price: Math.round(rawValue.price * 100),
				modules: [rawValue.modules],
			};

			const request = this.isEditMode() ? this.ramService.update(this.id()!, data) : this.ramService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Cambios guardados' : 'RAM (RAM) creada correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/ram/all']);
				},
				error: (err) => {
					this.isLoading.set(false);
					this.toast.show(err.error?.message || 'Error en la operación', 'error');
				},
			});
		}
	}
}

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { externalPower, gddrType, gpuType, interfaceType, syncType } from '../../../../shared/constants/index.constant';
import { userProfile } from '../../../../shared/models/user.model'; //
import { AuthService } from '../../../../shared/services/auth.service';
import { GpuService } from '../../../../shared/services/gpu.service';
import { ModalService } from '../../../../shared/services/modal.service';
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
	private readonly gpuService = inject(GpuService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.gpuService.isLoading;
	isEditMode = computed(() => !!this.id());
	selectedGpu = this.gpuService.selectedGpu;

	managementRoles = [userProfile.ADMIN]; //

	gpuTypes = Object.values(gpuType);
	syncTypes = Object.values(syncType);
	externalPowers = Object.values(externalPower);
	interfaceTypes = Object.values(interfaceType);
	gddrTypes = Object.values(gddrType);

	form: FormGroup = this.fb.group({
		manufacturer: ['', [Validators.required]],
		model: ['', [Validators.required]],
		gpu_type: ['', [Validators.required]],
		base_freq: [0, [Validators.required]],
		boost_freq: [0, [Validators.required]],
		memory: ['', [Validators.required]],
		memory_type: ['', [Validators.required]],
		interface: ['', [Validators.required]],
		frame_sync: ['', [Validators.required]],
		tdp: [0, [Validators.required]],
		ports: this.fb.group({
			vga: [0],
			dvi: [0],
			hdmi: [0],
			displayport: [0],
		}),
		external_power: ['', [Validators.required]],
		price: [0, [Validators.required, Validators.min(0)]],
	});

	// Propiedad computada para verificar el permiso de forma reactiva
	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	});

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar tarjeta gráfica', 'error');
			this.router.navigate(['/gpu/all']);
			return;
		}

		if (this.isEditMode()) {
			this.gpuService.selectedGpu.set(null);
			this.gpuService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea GHz y Euros
					console.log(this.selectedGpu());
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
						base_freq: res.data.base_freq / 1000, // MHz -> GHz
						boost_freq: res.data.base_freq / 1000, // MHz -> GHz
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar la Tarjeta Gráfica (GPU)', 'error');
					this.router.navigate(['/gpu/all']);
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
			cancelLabel: 'cancelar',
		});

		if (confirmed) {
			this.isLoading.set(true);

			// Transformamos de vuelta para MongoDB (Euros -> Céntimos, L -> cL)
			const rawValue = this.form.getRawValue();
			const data = {
				...rawValue,
				price: Math.round(rawValue.price * 100),
				base_freq: Math.round(rawValue.base_freq * 1000),
				boost_freq: Math.round(rawValue.boost_freq * 1000),
			};

			const request = this.isEditMode() ? this.gpuService.update(this.id()!, data) : this.gpuService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Cambios guardados' : 'Tarjeta Gráfica (GPU) creada correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/gpu/all']);
				},
				error: (err) => {
					this.isLoading.set(false);
					this.toast.show(err.error?.message || 'Error en la operación', 'error');
				},
			});
		}
	}
}

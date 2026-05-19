import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { cpuManufacturer } from '../../../../shared/constants/index.constant';
import { userProfile } from '../../../../shared/models/user.model'; //
import { AuthService } from '../../../../shared/services/auth.service';
import { CpuService } from '../../../../shared/services/cpu.service';
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
	private readonly cpuService = inject(CpuService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.cpuService.isLoading;
	isEditMode = computed(() => !!this.id());
	selectedCpu = this.cpuService.selectedCpu;

	managementRoles = [userProfile.ADMIN]; //

	cpuManufacturers = Object.values(cpuManufacturer);

	form: FormGroup = this.fb.group({
		manufacturer: ['', [Validators.required]],
		model: ['', [Validators.required]],
		series: ['', [Validators.required]],
		microarchitecture: ['', [Validators.required]],
		family: ['', [Validators.required]],
		socket: ['', [Validators.required]],
		core_count: [0, [Validators.required]],
		thread_count: [0, [Validators.required]],
		base_freq: [0, [Validators.required]],
		boost_freq: [0, [Validators.required]],
		l1_cache: [0],
		l2_cache: [0, [Validators.required]],
		l3_cache: [0, [Validators.required]],
		tdp: [0, [Validators.required]],
		hasIntegrated: [false],
		integrated_graphics: ['', []],
		price: [0, [Validators.required, Validators.min(0)]],
	});

	// Propiedad computada para verificar el permiso de forma reactiva
	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	});

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar procesadores', 'error');
			this.router.navigate(['/cpu/all']);
			return;
		}

		if (this.isEditMode()) {
			this.cpuService.selectedCpu.set(null);
			this.cpuService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea GHz y Euros
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
						base_freq: res.data.base_freq / 1000, // MHz -> GHz
						boost_freq: res.data.boost_freq / 1000, // MHz -> GHz
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar el Procesador (CPU)', 'error');
					this.router.navigate(['/cpu/all']);
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
			message: `¿Estás seguro de que deseas ${action} este procesador?`,
			confirmLabel: 'Aceptar',
			cancelLabel: 'cancelar',
		});

		if (confirmed) {
			this.isLoading.set(true);

			// Transformamos de vuelta para MongoDB (Euros -> Céntimos, L -> cL)
			const rawValue = this.form.getRawValue();
			const data = {
				...rawValue,
				price: rawValue.price * 100,
				base_freq: rawValue.base_freq * 1000,
				boost_freq: rawValue.boost_freq * 1000,
			};

			const request = this.isEditMode() ? this.cpuService.update(this.id()!, data) : this.cpuService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Cambios guardados' : 'Procesador (CPU) creada correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/cpu/all']);
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
			this.router.navigate(['/cpu/all']);
			return;
		}

		const response = await this.modal.confirm({
			title: `¿Descartar cambios?`,
			message: `¿Estás seguro de que deseas salir sin guardar?`,
		});

		if (response && response.confirmed) {
			this.router.navigate(['/cpu/all']);
		}
	}
}

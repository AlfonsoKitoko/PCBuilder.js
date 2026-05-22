import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { connectors, effRating, modular, psuType } from '../../../../shared/constants/index.constant';
import { userProfile } from '../../../../shared/models/user.model'; //
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { PsuService } from '../../../../shared/services/psu.service';
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
	private readonly psuService = inject(PsuService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.psuService.isLoading;
	isEditMode = computed(() => !!this.id());
	selectedPsu = this.psuService.selectedPsu;

	managementRoles = [userProfile.ADMIN]; //

	psuTypes = Object.values(psuType);
	effRatings = Object.values(effRating);
	modulars = Object.values(modular);
	connectors = Object.values(connectors);

	form: FormGroup = this.fb.group({
		manufacturer: ['', [Validators.required]],
		model: ['', [Validators.required]],
		psu_type: ['', [Validators.required]],
		wattage: ['', [Validators.required]],
		eff_rating: ['', [Validators.required]],
		modular: ['', [Validators.required]],
		connectors: this.fb.group({
			atx_24pin: [''],
			eps_8pin: [''],
			eps_4pin: [''],
			pcie_16pin_12vhpwr: [''],
			pcie_8pin: [''],
			pcie_6plus2pin: [''],
			pcie_6pin: [''],
			sata: [''],
			molex_4pin: [''],
		}),
		price: ['', [Validators.required, Validators.min(0)]],
	});

	// Propiedad computada para verificar el permiso de forma reactiva
	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	});

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar fuente de alimentación', 'error');
			this.router.navigate(['/psu/all']);
			return;
		}

		if (this.isEditMode()) {
			this.psuService.selectedPsu.set(null);
			this.psuService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea GHz y Euros
					console.log(this.selectedPsu());
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar la Fuente de Alimentación (PSU)', 'error');
					this.router.navigate(['/psu/all']);
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
			message: `¿Estás seguro de que deseas ${action} esta Fuente de alimentación?`,
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

			const request = this.isEditMode() ? this.psuService.update(this.id()!, data) : this.psuService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Cambios guardados' : 'Fuente de Alimentación (PSU) creada correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/psu/all']);
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
			this.router.navigate(['/psu/all']);
			return;
		}

		const response = await this.modal.confirm({
			title: `¿Descartar cambios?`,
			message: `¿Estás seguro de que deseas salir sin guardar?`,
		});

		if (response && response.confirmed) {
			this.router.navigate(['/psu/all']);
		}
	}
}

import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { caseType, moboFormFactor } from '../../../../shared/constants/index.constant';
import { userProfile } from '../../../../shared/models/user.model'; //
import { AuthService } from '../../../../shared/services/auth.service';
import { CaseService } from '../../../../shared/services/case.service';
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
	private readonly caseService = inject(CaseService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.caseService.isLoading;
	isEditMode = computed(() => !!this.id());
	selectedCase = this.caseService.selectedCase;

	managementRoles = [userProfile.ADMIN];

	caseTypes = Object.values(caseType);
	formFactors = Object.values(moboFormFactor);

	form: FormGroup = this.fb.group({
		manufacturer: ['', [Validators.required]],
		model: ['', [Validators.required]],
		case_type: ['', [Validators.required]],
		volume: ['', [Validators.required, Validators.min(0)]],
		form_factor: ['', [Validators.required]],
		front_panel: this.fb.group({
			usb2TypA: [''],
			usb3gen1A: [''],
			usb32gen2x2C: [''],
			usb3gen2C: [''],
			usb3gen1C: [''],
		}),
		internal_bays: this.fb.group({
			int35: [''],
			int25: [''],
		}),
		power_supply: [false, [Validators.required]],
		color: ['', [Validators.required]],
		price: ['', [Validators.required, Validators.min(0)]],
	});

	// Propiedad computada para verificar el permiso de forma reactiva
	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	});

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar chasis', 'error');
			this.router.navigate(['/case/all']);
			return;
		}

		if (this.isEditMode()) {
			this.caseService.selectedCase.set(null);
			this.caseService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea Litros y Euros
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
						volume: res.data.volume / 100, // cL -> L
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar la caja', 'error');
					this.router.navigate(['/case/all']);
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
			message: `¿Estás seguro de que deseas ${action} esta caja?`,
			confirmLabel: 'Aceptar',
			cancelLabel: 'cancelar',
		});

		if (confirmed) {
			this.isLoading.set(true);

			// Transformamos de vuelta para MongoDB
			const rawValue = this.form.getRawValue();
			const data = {
				...rawValue,
				price: rawValue.price * 100,
				volume: rawValue.volume * 100,
			};

			const request = this.isEditMode() ? this.caseService.update(this.id()!, data) : this.caseService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Cambios guardados' : 'Caja creada correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/case/all']);
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
			this.router.navigate(['/case/all']);
			return;
		}

		const response = await this.modal.confirm({
			title: `¿Descartar cambios?`,
			message: `¿Estás seguro de que deseas salir sin guardar?`,
		});

		if (response && response.confirmed) {
			this.router.navigate(['/case/all']);
		}
	}
}

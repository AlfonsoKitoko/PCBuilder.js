import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { moboFormFactor, ramType, wifiStandard } from '../../../../shared/constants/index.constant';
import { userProfile } from '../../../../shared/models/user.model'; //
import { AuthService } from '../../../../shared/services/auth.service';
import { MoboService } from '../../../../shared/services/mobo.service';
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
	private readonly moboService = inject(MoboService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.moboService.isLoading;
	isEditMode = computed(() => !!this.id());
	selectedMobo = this.moboService.selectedMobo;

	managementRoles = [userProfile.ADMIN]; //

	moboFormFactors = Object.values(moboFormFactor);
	ramTypes = Object.values(ramType);
	wifiStandards = Object.values(wifiStandard);

	form: FormGroup = this.fb.group({
		manufacturer: ['', [Validators.required]],
		model: ['', [Validators.required]],
		socket: ['', [Validators.required]],
		form_factor: ['', [Validators.required]],
		chipset: ['', [Validators.required]],
		ram_type: ['', [Validators.required]],
		ram_slots: ['', [Validators.required]],
		internal_connectors: this.fb.group({
			storage: this.fb.group({
				sata_3gb: [''],
				sata_6gb: [''],
				m2_slots: [''],
				ide_pata: [''],
				floppy: [''],
			}),
			expansion_slots: this.fb.group({
				x16: [''],
				x8: [''],
				x4: [''],
				x1: [''],
				pci_legacy: [''],
				agp_slot: [''],
			}),
			usb_headers: this.fb.group({
				usb2: [''],
				usb3_gen1: [''],
				usb3_gen2: [''],
				usb3_gen2x2: [''],
				serial_header: [''],
			}),
		}),
		rear_io: this.fb.group({
			usb_ports: this.fb.group({
				ps2: [''],
				serial_com: [''],
				usb2: [''],
				usb3_gen1: [''],
				usb3_gen2: [''],
				usb3_gen2x2: [''],
			}),
			ethernet: this.fb.group({
				speed: [''],
				quantity: [''],
			}),
			video: this.fb.group({
				vga: [''],
				dvi: [''],
				hdmi: [''],
				displayport: [''],
			}),
			audio_jacks: [''],
		}),
		wireless: this.fb.group({
			wifi: ['', [Validators.required]],
			bluetooth: [false, [Validators.required]],
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
			this.toast.show('No tienes permisos para gestionar tarjeta gráfica', 'error');
			this.router.navigate(['/motherboard/all']);
			return;
		}

		if (this.isEditMode()) {
			this.moboService.selectedMobo.set(null);
			this.moboService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea GHz y Euros
					console.log(this.selectedMobo());
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar la Placa Base (MOTHERBOARD)', 'error');
					this.router.navigate(['/motherboard/all']);
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
			message: `¿Estás seguro de que deseas ${action} esta Placa base?`,
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

			const request = this.isEditMode() ? this.moboService.update(this.id()!, data) : this.moboService.create(data);

			request.subscribe({
				next: () => {
					const msg = this.isEditMode() ? 'Cambios guardados' : 'Placa Base (MOTHERBOARD) creada correctamente';
					this.toast.show(msg, 'success');
					this.router.navigate(['/motherboard/all']);
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
			this.router.navigate(['/motherboard/all']);
			return;
		}

		const response = await this.modal.confirm({
			title: `¿Descartar cambios?`,
			message: `¿Estás seguro de que deseas salir sin guardar?`,
		});

		if (response && response.confirmed) {
			this.router.navigate(['/motherboard/all']);
		}
	}
}

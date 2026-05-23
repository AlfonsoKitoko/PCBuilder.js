import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BuildReporterComponent } from '../../../../shared/components/build-reporter/build-reporter';
import { BuildWattageDetailsComponent } from '../../../../shared/components/build-wattage-details/build-wattage-details';
import { BuildState } from '../../../../shared/models/build-state.model';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-newedit',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		CurrencyPipe,
		DecimalPipe,
		BuildReporterComponent,
		BuildWattageDetailsComponent,
	],
	templateUrl: './newedit.html',
})
export default class NewEdit implements OnInit {
	id = input<string>();
	slug = input<string>();

	private readonly fb = inject(FormBuilder);
	readonly buildService = inject(BuildService);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	isLoading = this.buildService.isLoading;
	slots = this.buildService.currentBuild;
	analysis = this.buildService.analysis;

	totalWattage = computed(() => this.buildService.localWattage() || 0);
	totalPrice = computed(() => this.buildService.currentPrice() || 0);

	form: FormGroup = this.fb.group({
		name: ['', [Validators.required]],
		description: ['', [Validators.maxLength(500)]],
		cpu: [null, [Validators.required]],
		mobo: [null, [Validators.required]],
		ram: [null, [Validators.required]],
		storage: [null, [Validators.required]],
		gpu: [null],
		case: [null, [Validators.required]],
		psu: [null, [Validators.required]],
		os: [null],
	});

	constructor() {
		// Sincroniza cambios del formulario para persistir nombre/descripción en el servicio
		this.form.valueChanges.subscribe((val) => {
			this.buildService.updateMetadata(val.name, val.description);
		});

		// CHIVATO: Monitoriza el estado actual de la build y el análisis del backend
		effect(() => {
			const currentSlots = this.slots();

			this.form.patchValue(
				{
					cpu: currentSlots.cpu?._id || null,
					mobo: currentSlots.mobo?._id || null,
					ram: currentSlots.ram.length > 0 ? currentSlots.ram.map((r) => r._id) : null,
					storage: currentSlots.storage.length > 0 ? currentSlots.storage.map((s) => s._id) : null,
					gpu: currentSlots.gpu?._id || null,
					case: currentSlots.case?._id || null,
					psu: currentSlots.psu?._id || null,
					os: currentSlots.os?._id || null,
				},
				{ emitEvent: false },
			);

			Object.keys(this.form.controls).forEach((key) => {
				const control = this.form.get(key);
				if (control && control.value !== null && control.value !== '') {
					control.markAsDirty();
					control.markAsTouched();
				}
			});

			// LOG DE VOLTAJES ESPECÍFICO
			if (currentSlots.ram && currentSlots.ram.length > 0) {
				console.table(
					currentSlots.ram.map((kit) => ({
						modelo: kit.model,
						voltaje_raw: kit.voltage,
						sticks: kit.modules?.[0]?.quantity || 1,
					})),
				);
			} else {
				console.log('RAM: No hay kits seleccionados');
			}

			console.log('Análisis Backend:', this.analysis());
			console.log('Watts calculados (local):', this.totalWattage());
			console.log('--------------------');
		});
	}

	currentUser = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => {
		const user = this.currentUser();
		return user ? this.managementRoles.includes(user.profile as userProfile) : false;
	});

	async ngOnInit() {
		const current = this.buildService.currentBuild();
		const routeId = this.id();

		console.log('Verificando estado de edición:', { routeId, currentId: current._id });

		if (routeId && current._id === routeId) {
			console.log('Persistiendo cambios temporales de la build:', routeId);
			this.fillForm();
			return;
		}

		if (routeId) {
			this.buildService.getById(routeId).subscribe({
				next: (res) => {
					const build = res.data;
					const user = this.currentUser();

					const isOwner = user && build.owner._id === user._id;
					if (!isOwner && !this.canManage()) {
						this.toast.show('No tienes permiso para editar esta build', 'error');
						this.router.navigate(['/build/all']);
						return;
					}

					this.buildService.setEditBuild(build);
					this.fillForm();
				},
				error: (err) => {
					const serverMessage = err?.error?.message || err?.message || 'Error desconocido al cargar la build';

					this.toast.show(serverMessage, 'error');
					this.router.navigate(['/build/all']);
				},
			});
		} else {
			if (current._id) this.buildService.resetBuild();

			this.fillForm();
		}
	}

	private fillForm() {
		const current = this.slots();
		this.form.patchValue(
			{
				name: current.name,
				description: current.description,
			},
			{ emitEvent: false },
		);
	}

	onRemove(type: keyof BuildState, index?: number) {
		this.buildService.removePart(type, index);
		const controlName = type === 'mobo' ? 'motherboard' : (type as string);
		const control = this.form.get(controlName);
		if (control) {
			control.markAsTouched();
			control.markAsDirty();
		}
	}

	calculateSubtotal(items: any[]): number {
		return items.reduce((acc, item) => acc + (item?.price || 0), 0);
	}

	goToSelect(type: string, index?: number) {
		this.buildService.editIndex = index;
		const controlName = type === 'mobo' ? 'motherboard' : type;
		const control = this.form.get(controlName);
		if (control) {
			control.markAsTouched();
			control.markAsDirty();
		}

		const extras: any = {};
		if (index !== undefined) extras.queryParams = { editIndex: index };
		this.router.navigate([type, 'all'], extras);
	}

	resetBuild() {
		this.buildService.resetBuild();
	}

	async discardBuild() {
		const res = await this.modal.confirm({
			title: '¿Descartar Build?',
			message: '¿Se perderán todos los componentes, estás seguro?',
			confirmLabel: 'Si, descartar',
			type: 'danger',
		});

		if (res.confirmed) {
			this.form.reset({}, { emitEvent: false });
			this.buildService.resetBuild();
			this.router.navigate(['build/all']);
		}
	}

	async save() {
		// 1. Forzamos de forma visual que la tabla pinte los errores en rojo
		this.form.markAllAsTouched();
		Object.keys(this.form.controls).forEach((key) => {
			this.form.get(key)?.markAsDirty();
		});

		// ==========================================
		// CONTROL 1: EVALUAR COMPONENTES FALTANTES
		// ==========================================
		const componentLabels: Record<string, string> = {
			cpu: 'Procesador (CPU)',
			motherboard: 'Placa base',
			ram: 'Memoria RAM',
			storage: 'Almacenamiento',
			case: 'Caja',
			psu: 'Fuente de alimentación (PSU)',
		};

		const missingComponents = Object.keys(componentLabels)
			.filter((key) => this.form.get(key)?.invalid)
			.map((key) => componentLabels[key]);

		if (missingComponents.length > 0) {
			this.toast.show(`Faltan componentes obligatorios: ${missingComponents.join(', ')}`, 'error');
			return;
		}

		// ==========================================
		// CONTROL 2: EVALUAR INCOMPATIBILIDADES (ANÁLISIS)
		// ==========================================
		const buildAnalysis = this.analysis();

		if (buildAnalysis.errors && buildAnalysis.errors.length > 0) {
			this.toast.show(
				'La configuración actual contiene errores de compatibilidad. Por favor, revisa los detalles del análisis arriba.',
				'error',
			);
			return; // Bloquea el flujo (los warnings se ignoran y permiten pasar)
		}

		// ==========================================
		// PASO FINAL: APERTURA DEL MODAL (BUILD VÁLIDA)
		// ==========================================
		const result = await this.modal.confirm({
			title: this.id() ? 'Actualizar Build' : 'Finalizar Build',
			message: 'Introduce el nombre y la descripción de tu build',
			type: 'build',
			confirmLabel: this.id() ? 'Actualizar' : 'Guardar',
			initialData: {
				name: this.form.value.name,
				description: this.form.value.description,
			},
		});

		if (!result.confirmed || !result.data) return;

		this.form.patchValue(result.data);

		if (this.form.get('name')?.invalid) {
			this.toast.show('El nombre de la build es obligatorio.', 'error');
			return;
		}

		// Construimos el payload de guardado
		const s = this.slots();
		const payload = {
			...this.form.getRawValue(),
			cpu: s.cpu?._id,
			motherboard: s.mobo?._id,
			ram: s.ram.map((r) => r._id),
			storage: s.storage.map((st) => st._id),
			gpu: s.gpu?._id,
			case: s.case?._id,
			psu: s.psu?._id,
			os: s.os?._id,
		};

		console.log('Enviando Payload Final:', payload);

		const request$ = this.id() ? this.buildService.update(this.id()!, payload) : this.buildService.create(payload);

		request$.subscribe({
			next: (res) => {
				this.toast.show('Build Guardada !!', 'success');
				this.router.navigate(['build/mine']).then(() => this.buildService.resetBuild());
			},
			error: (error) => {
				console.error('Error en el guardado:', error);
				const errMsg = error?.error?.message || error?.message || 'Error al crear Build';
				this.toast.show(errMsg, 'error');
			},
		});
	}
}

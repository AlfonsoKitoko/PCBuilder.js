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
	});

	constructor() {
		// Sincroniza cambios del formulario para persistir nombre/descripción en el servicio
		this.form.valueChanges.subscribe((val) => {
			this.buildService.updateMetadata(val.name, val.description);
		});

		// CHIVATO: Monitoriza el estado actual de la build y el análisis del backend
		effect(() => {
			const currentSlots = this.slots();
			console.log('--- BUILD UPDATE ---');
			console.log('Slots actuales:', currentSlots);

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
		// 1. Obtenemos el estado actual del servicio
		const current = this.buildService.currentBuild();
		const routeId = this.id();

		console.log('Verificando estado de edición:', { routeId, currentId: current._id });

		// 2. Si ya estamos editando esta build, NO cargamos de la API.
		// Esto permite que al volver de "seleccionar componente", los cambios sigan ahí.
		if (routeId && current._id === routeId) {
			console.log('Persistiendo cambios temporales de la build:', routeId);
			this.fillForm();
			return;
		}

		// 3. Si hay un ID en la ruta pero no coincide con lo que hay en el servicio,
		// entonces sí es una carga limpia (el usuario entró desde el listado).
		if (routeId) {
			this.buildService.getById(routeId).subscribe({
				next: (res) => {
					const build = res.data;
					const user = this.currentUser();

					// Validación de seguridad (Dueño o Admin)
					const isOwner = user && build.owner._id === user._id;
					if (!isOwner && !this.canManage()) {
						this.toast.show('No tienes permiso para editar esta build', 'error');
						this.router.navigate(['/build/all']);
						return;
					}

					this.buildService.setEditBuild(build);
					this.fillForm();
				},
				error: () => {
					this.toast.show('Error al cargar la build', 'error');
					this.router.navigate(['/build/all']);
				},
			});
		} else {
			// Si no hay ID, es una build nueva. Solo nos aseguramos de que el form esté limpio.
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
	}

	calculateSubtotal(items: any[]): number {
		return items.reduce((acc, item) => acc + (item?.price || 0), 0);
	}

	goToSelect(type: string) {
		this.router.navigate([type, 'all']);
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
			this.buildService.resetBuild();
			this.router.navigate(['build/all']);
		}
	}

	async save() {
		const s = this.slots();

		const requiredParts = [
			{ field: s.cpu, label: 'Procesador (CPU)' },
			{ field: s.mobo, label: 'Placa base' },
			{ field: s.ram.length > 0 ? true : null, label: 'Memoria RAM' },
			{ field: s.storage.length > 0 ? true : null, label: 'Almacenamiento' },
			{ field: s.case, label: 'Caja' },
			{ field: s.psu, label: 'Fuente de alimentación (PSU)' },
		];

		const missing = requiredParts.filter((p) => !p.field).map((p) => p.label);

		if (missing.length > 0) {
			this.toast.show(`Faltan componentes: ${missing.join(', ')}`, 'error');
			return;
		}

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

		const payload = {
			...this.form.getRawValue(),
			cpu: s.cpu?._id,
			mobo: s.mobo?._id,
			ram: s.ram.map((r) => r._id),
			storage: s.storage.map((st) => st._id),
			gpu: s.gpu?._id,
			case: s.case?._id,
			psu: s.psu?._id,
			os: s.os?._id,
		};

		// CHIVATO: Ver qué enviamos exactamente al servidor
		console.log('Enviando Payload Final:', payload);

		const request$ = this.id() ? this.buildService.update(this.id()!, payload) : this.buildService.create(payload);

		request$.subscribe({
			next: (res) => {
				this.toast.show('Build Guardada !!', 'success');
				this.router.navigate(['build/mine']).then(() => this.buildService.resetBuild());
			},
			error: (error) => {
				console.error('Error en el guardado:', error);
				this.toast.show('Error al crear Build', 'error');
			},
		});
	}
}

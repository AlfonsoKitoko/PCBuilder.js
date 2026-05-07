import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BuildState } from '../../../../shared/models/build-state.model';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-newedit',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule, CurrencyPipe, DecimalPipe],
	templateUrl: './newedit.html',
})
export default class NewEdit implements OnInit {
	id = input<string>();
	slug = input<string>();

	private readonly fb = inject(FormBuilder);
	private readonly buildService = inject(BuildService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	isLoading = this.buildService.isLoading;
	slots = this.buildService.currentBuild;
	analysis = this.buildService.analysis;

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
			console.log('--- BUILD UPDATE ---');
			console.log('Slots actuales:', this.slots());
			console.log('Análisis Backend:', this.analysis());
			console.log('Precio calculado (Céntimos):', Math.round(this.totalPrice() * 100));
			console.log('--------------------');
		});
	}

	async ngOnInit() {
		if (this.id()) {
			this.buildService.getById(this.id()!).subscribe((res) => {
				this.buildService.setEditBuild(res.data);
				this.fillForm();
			});
		} else {
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

	readonly totalPrice = computed(() => {
		const s = this.slots();
		const all = [s.cpu, s.mobo, ...s.ram, ...s.storage, s.gpu, s.case, s.psu, s.os].filter(Boolean);
		return all.reduce((acc, item) => acc + (item?.price || 0), 0);
	});

	onRemove(type: keyof BuildState, index?: number) {
		this.buildService.removePart(type, index);
	}

	calculateSubtotal(items: any[]): number {
		return items.reduce((acc, item) => acc + (item?.price || 0), 0);
	}

	goToSelect(type: string) {
		this.router.navigate([type, 'all']);
	}

	save() {
		if (this.form.invalid) {
			this.toast.show('la build no es válida', 'error');
			return;
		}

		const s = this.slots();

		const payload = {
			...this.form.getRawValue(),
			cpu: s.cpu?._id,
			mobo: s.mobo?._id,
			gpu: s.gpu?._id,
			psu: s.psu?._id,
			case: s.case?._id,
			os: s.os?._id,
			ram: s.ram.map((r) => r._id),
			storage: s.storage.map((st) => st._id),
			totalWattage: this.analysis().totalWattage,
			totalPrice: Math.round(this.totalPrice() * 100),
		};

		// CHIVATO: Ver qué enviamos exactamente al servidor
		console.log('Enviando Payload Final:', payload);

		const request$ = this.id() ? this.buildService.update(this.id()!, payload) : this.buildService.create(payload);
		request$.subscribe({
			next: (res) => {
				this.toast.show('Build Guardada !!', 'success');
				this.buildService.resetBuild();
				this.router.navigate(['builds/mine']);
			},
			error: (error) => {
				console.error('Error en el guardado:', error);
				this.toast.show('Error al crear Build', 'error');
			},
		});
	}
}

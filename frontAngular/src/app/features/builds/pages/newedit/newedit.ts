import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BuildState } from '../../../../shared/models/build-state.model';
import { BuildService } from '../../../../shared/services/build.service';
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
	private readonly buildService = inject(BuildService);
	private readonly router = inject(Router);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	isLoading = this.buildService.isLoading;

	form: FormGroup = this.fb.group({
		name: [, [Validators.required]],
		description: [,],
	});

	slots = this.buildService.currentBuild;

	stats = computed(() => {
		const s = this.slots();
		const all = [s.cpu, s.mobo, ...s.ram, ...s.storage, s.gpu, s.case, s.psu, s.os].filter(Boolean);

		const totalWattage = (s.cpu?.tdp || 0) + (s.gpu?.tdp || 0);
		const totalPrice = all.reduce((acc, item) => acc + (item?.price || 0), 0);

		return {
			totalPrice: totalPrice,
			totalWattage,
		};
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

	ngOnInit() {}

	async save() {
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
			// Para los arrays (RAM y Storage), mapeamos a sus _id
			ram: s.ram.map((r) => r._id),
			storage: s.storage.map((st) => st._id),
			totalWattage: this.stats().totalWattage,
			totalPrice: Math.round(this.stats().totalPrice * 100), // Guardamos en céntimos
		};

		try {
			if (this.id()) {
				await this.buildService.update(this.id()!, payload);
			} else {
				await this.buildService.create(payload);
			}
			this.toast.show('Build Guardada !!', 'success');
		} catch (error) {
			this.toast.show('Error al crear Build', 'error');
		}
	}
}

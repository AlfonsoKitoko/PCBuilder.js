import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { RamService } from '../../../../shared/services/ram.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-ram',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './ram.html',
})
export default class Ram {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly ramService = inject(RamService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	ram = this.ramService.selectedRam;
	currentUser = computed(() => this.authService.user());
	isLoading = this.ramService.isLoading;

	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => this.managementRoles.includes(this.currentUser()!.profile as userProfile));

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadRam(id);
	}

	loadRam(id: string) {
		this.ramService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error');
				this.router.navigate(['ram/all']);
			},
		});
	}
	addToBuild() {
		const currentRam = this.ram();
		if (currentRam) {
			this.buildService.addPart('ram', currentRam);

			this.toast.show(`${currentRam.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}

	async deleteRam() {
		const currentRam = this.ram();
		if (!currentRam) return;

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar Componente?',
			message: `¿Quieres borrar permanentemente ${currentRam.manufacturer} ${currentRam.model}?`,
			confirmLabel: 'Eliminar',
			cancelLabel: 'Cancelar',
		});

		if (confirmed) {
			this.ramService.delete(currentRam._id!).subscribe({
				next: () => {
					this.toast.show('RAM eliminada', 'success');
					this.router.navigate(['/ram/all']);
				},
				error: () => this.toast.show('Error al elminiar', 'error'),
			});
		}
	}
}

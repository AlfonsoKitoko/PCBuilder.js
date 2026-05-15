import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { MoboService } from '../../../../shared/services/mobo.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-mobo',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './mobo.html',
})
export default class Mobo {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly moboService = inject(MoboService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	mobo = this.moboService.selectedMobo;
	currentUser = computed(() => this.authService.user());
	isLoading = this.moboService.isLoading;

	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => {
		const user = this.currentUser();
		return user ? this.managementRoles.includes(user.profile as userProfile) : false;
	});

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadMobo(id);
	}

	loadMobo(id: string) {
		this.moboService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar Placa Base', 'error');
				this.router.navigate(['mobo/all']);
			},
		});
	}
	addToBuild() {
		const currentMobo = this.mobo();
		if (currentMobo) {
			this.buildService.addPart('mobo', currentMobo);

			this.toast.show(`${currentMobo.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}

	async deleteMobo() {
		const currentMobo = this.mobo();
		if (!currentMobo) return;

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar Componente?',
			message: `¿Quieres borrar permanentemente ${currentMobo.manufacturer} ${currentMobo.model}?`,
			confirmLabel: 'Eliminar',
			cancelLabel: 'Cancelar',
		});

		if (confirmed) {
			this.moboService.delete(currentMobo._id!).subscribe({
				next: () => {
					this.toast.show('Placa Base eliminada', 'success');
					this.router.navigate(['/mobo/all']);
				},
				error: () => this.toast.show('Error al eliminar', 'error'),
			});
		}
	}
}

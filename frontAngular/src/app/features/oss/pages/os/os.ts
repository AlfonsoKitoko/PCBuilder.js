import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { OsService } from '../../../../shared/services/os.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-os',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './os.html',
})
export default class Os {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly osService = inject(OsService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	os = this.osService.selectedOs;
	currentUser = computed(() => this.authService.user());
	isLoading = this.osService.isLoading;

	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => {
		const user = this.currentUser();
		return user ? this.managementRoles.includes(user.profile as userProfile) : false;
	});

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadOs(id);
	}

	loadOs(id: string) {
		this.osService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error');
				this.router.navigate(['os/all']);
			},
		});
	}
	addToBuild() {
		const currentOs = this.os();
		if (currentOs) {
			this.buildService.addPart('os', currentOs);

			this.toast.show(`${currentOs.version} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}

	async deleteOs() {
		const currentOs = this.os();
		if (!currentOs) return;

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar Componente?',
			message: `¿Quieres borrar permanentemente ${currentOs.manufacturer} ${currentOs.version}?`,
			confirmLabel: 'Eliminar',
			cancelLabel: 'Cancelar',
		});

		if (confirmed) {
			this.osService.delete(currentOs._id!).subscribe({
				next: () => {
					this.toast.show('Sistema operativo eliminado', 'success');
					this.router.navigate(['/os/all']);
				},
				error: () => this.toast.show('Error al eliminar', 'error'),
			});
		}
	}
}

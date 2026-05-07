import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-storage',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './storage.html',
})
export default class Storage {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly storageService = inject(StorageService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	storage = this.storageService.selectedStorage;
	currentUser = computed(() => this.authService.user());
	isLoading = this.storageService.isLoading;

	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => this.managementRoles.includes(this.currentUser()!.profile as userProfile));

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadStorage(id);
	}

	loadStorage(id: string) {
		this.storageService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error');
				this.router.navigate(['storage/all']);
			},
		});
	}
	addToBuild() {
		const currentStorage = this.storage();
		if (currentStorage) {
			this.buildService.addPart('storage', currentStorage);

			this.toast.show(`${currentStorage.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}

	async deleteStorage() {
		const currentStorage = this.storage();
		if (!currentStorage) return;

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar Componente?',
			message: `¿Quieres borrar permanentemente ${currentStorage.manufacturer} ${currentStorage.model}?`,
			confirmLabel: 'Eliminar',
			cancelLabel: 'Cancelar',
		});

		if (confirmed) {
			this.storageService.delete(currentStorage._id!).subscribe({
				next: () => {
					this.toast.show('Disco Duro eliminado', 'success');
					this.router.navigate(['/storage/all']);
				},
				error: () => this.toast.show('Error al elminiar', 'error'),
			});
		}
	}
}

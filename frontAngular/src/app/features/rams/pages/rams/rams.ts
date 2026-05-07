import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { RamService } from '../../../../shared/services/ram.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-rams',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './rams.html',
})
export default class Rams {
	private readonly router = inject(Router);
	private readonly ramService = inject(RamService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	tableHandler = useTableHandler(this.ramService.rams, [
		'manufacturer',
		'model',
		'ram_type',
		'modules',
		'speed',
		'cas_latency',
		'voltage',
		'price',
	]);

	rams = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.ramService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => this.managementRoles.includes(this.user()!.profile as userProfile));

	ngOnInit() {
		this.ramService.getAll();
	}

	quickAddToBuild(event: Event, item: any) {
		event.stopPropagation();

		if (item) {
			this.buildService.addPart('ram', item);

			this.toast.show(`${item.manufacturer} ${item.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) this.router.navigate(['/build/edit', buildId]);
			else this.router.navigate(['/build/new']);
		}
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/ram', id, slug]);
	}

	async deleteRam(event: Event, item: any) {
		event.stopPropagation();

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar?',
			message: `¿Quieres eliminar ${item.model}?`,
			confirmLabel: 'Borrar',
			cancelLabel: 'Volver',
		});

		if (confirmed) {
			this.ramService.delete(item._id).subscribe({
				next: () => this.toast.show('Componente borrado', 'success'),
				error: () => this.toast.show('No se pudo eliminar', 'error'),
			});
		}
	}
}

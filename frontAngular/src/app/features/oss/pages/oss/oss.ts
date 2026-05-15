import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { OsService } from '../../../../shared/services/os.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { generateSlug } from '../../../../shared/utils/generate-slug';
import { getImageUrl } from '../../../../shared/utils/image-mapper';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-oss',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './oss.html',
})
export default class Oss {
	private readonly router = inject(Router);
	private readonly osService = inject(OsService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;
	private generateSlug = generateSlug;

	tableHandler = useTableHandler(this.osService.oss, ['manufacturer', 'version', 'edition', 'mode', 'price']);

	oss = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.osService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => {
		const user = this.user();
		return user ? this.managementRoles.includes(user.profile as userProfile) : false;
	});

	ngOnInit() {
		this.osService.getAll();
	}

	quickAddToBuild(event: Event, item: any) {
		event.stopPropagation();

		if (item) {
			this.buildService.addPart('os', item);

			this.toast.show(`${item.manufacturer} ${item.model} añadido a la build`, 'success');

			const currentBuild = this.buildService.currentBuild();

			if (currentBuild._id) {
				const slug = currentBuild.name ? this.generateSlug(currentBuild.name) : '';
				this.router.navigate(['/build/edit', currentBuild._id, slug]);
			} else this.router.navigate(['/build/new']);
		}
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/os', id, slug]);
	}

	async deleteOs(event: Event, item: any) {
		event.stopPropagation();

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar?',
			message: `¿Quieres eliminar ${item.model}?`,
			confirmLabel: 'Borrar',
			cancelLabel: 'Volver',
		});

		if (confirmed) {
			this.osService.delete(item._id).subscribe({
				next: () => this.toast.show('Componente borrado', 'success'),
				error: () => this.toast.show('No se pudo eliminar', 'error'),
			});
		}
	}
}

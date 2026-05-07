import { CommonModule, CurrencyPipe, KeyValuePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { CaseService } from '../../../../shared/services/case.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-cases',
	imports: [CommonModule, RouterModule, CurrencyPipe, KeyValuePipe],
	templateUrl: './cases.html',
})
export default class Cases {
	private readonly router = inject(Router);
	private readonly caseService = inject(CaseService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	tableHandler = useTableHandler(this.caseService.cases, [
		'manufacturer',
		'model',
		'case_type',
		'volume',
		'form_factor',
		'front_panel',
		'internal_bays',
		'power_supply',
		'color',
		'price',
	]);

	cases = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.caseService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => this.managementRoles.includes(this.user()!.profile as userProfile));

	ngOnInit() {
		this.caseService.getAll();
	}

	quickAddToBuild(event: Event, item: any) {
		event.stopPropagation();

		if (item) {
			this.buildService.addPart('case', item);

			this.toast.show(`${item.manufacturer} ${item.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) this.router.navigate(['/build/edit', buildId]);
			else this.router.navigate(['/build/new']);
		}
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/case', id, slug]);
	}

	async deleteCase(event: Event, item: any) {
		event.stopPropagation();

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar?',
			message: `¿Quieres eliminar ${item.model}?`,
			confirmLabel: 'Borrar',
			cancelLabel: 'Volver',
		});

		if (confirmed) {
			this.caseService.delete(item._id).subscribe({
				next: () => this.toast.show('Componente borrado', 'success'),
				error: () => this.toast.show('No se pudo eliminar', 'error'),
			});
		}
	}
}

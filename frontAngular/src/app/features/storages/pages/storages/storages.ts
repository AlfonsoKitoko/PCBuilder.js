import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-storages',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './storages.html',
})
export default class Storages {
	private readonly router = inject(Router);
	private readonly storageService = inject(StorageService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	tableHandler = useTableHandler(this.storageService.storages, [
		'manufacturer',
		'model',
		'capacity',
		'type',
		'form_factor',
		'interface',
		'cache',
		'nvme',
		'price',
	]);

	storages = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.storageService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	ngOnInit() {
		this.storageService.getAll();
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/storage', id, slug]);
	}
}

import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { MoboService } from '../../../../shared/services/mobo.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-mobos',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './mobos.html',
})
export default class Mobos {
	private readonly router = inject(Router);
	private readonly moboService = inject(MoboService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	tableHandler = useTableHandler(this.moboService.mobos, [
		'manufacturer',
		'model',
		'socket',
		'form_factor',
		'chipset',
		'ram_type',
		'ram_slots',
		'internal_connectors',
		'rear_io',
		'wireless',
		'price',
	]);

	mobos = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.moboService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	ngOnInit() {
		this.moboService.getAll();
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/motherboard', id, slug]);
	}
}

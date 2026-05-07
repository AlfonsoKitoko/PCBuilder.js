import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { CpuService } from '../../../../shared/services/cpu.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-cpus',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './cpus.html',
})
export default class Cpus {
	private readonly router = inject(Router);
	private readonly cpuService = inject(CpuService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	tableHandler = useTableHandler(this.cpuService.cpus, [
		'manufacturer',
		'model',
		'series',
		'microarchitecture',
		'socket',
		'core_count',
		'base_freq',
		'boost_freq',
		'l3_cache',
		'l3_cache',
		'tdp',
		'hasIntegrated',
		'price',
	]);

	cpus = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.cpuService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	ngOnInit() {
		this.cpuService.getAll();
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/cpu', id, slug]);
	}
}

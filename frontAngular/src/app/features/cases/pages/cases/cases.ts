import { CommonModule, CurrencyPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
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
	private readonly authSrvice = inject(AuthService);
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

	ngOnInit() {
		this.caseService.getAll();
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/case', id, slug]);
	}
}

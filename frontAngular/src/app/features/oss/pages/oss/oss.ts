import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { OsService } from '../../../../shared/services/os.service';
import { ToastService } from '../../../../shared/services/toast.service';
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
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	tableHandler = useTableHandler(this.osService.oss, ['manufacturer', 'version', 'edition', 'mode', 'price']);

	oss = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.osService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	ngOnInit() {
		this.osService.getAll();
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/os', id, slug]);
	}
}

import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { PsuService } from '../../../../shared/services/psu.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { useTableHandler } from '../../../../shared/utils/table-handler.util'
import { userProfile } from '../../../../shared/models/user.model'
import { getImageUrl } from '../../../../shared/utils/image-mapper'

@Component({
	selector: 'app-psus',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './psus.html',
})
export default class Psus {
	private readonly router = inject(Router)
	private readonly psuService = inject(PsuService)
	private readonly authService = inject(AuthService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)
	readonly getImageUrl = getImageUrl

	tableHandler = useTableHandler(
		this.psuService.psus, [
		'manufacturer', 'model', 'psu_type', 'wattage',
		'eff_rating', 'modular', 'connectors', 'price'
	])

	psus = this.tableHandler.filteredData
	searchTerm = this.tableHandler.searchTerm
	isLoading = this.psuService.isLoading

	user = computed(() => this.authService.user())
	managementRoles = [userProfile.ADMIN]

	ngOnInit() { this.psuService.getAll() }

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return
		this.router.navigate(['/psu', id, slug])
	}
}

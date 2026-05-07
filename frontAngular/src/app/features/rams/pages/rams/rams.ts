import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { RamService } from '../../../../shared/services/ram.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { useTableHandler } from '../../../../shared/utils/table-handler.util'
import { userProfile } from '../../../../shared/models/user.model'
import { getImageUrl } from '../../../../shared/utils/image-mapper'

@Component({
	selector: 'app-rams',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './rams.html',
})
export default class Rams {
	private readonly router = inject(Router)
	private readonly ramService = inject(RamService)
	private readonly authService = inject(AuthService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)
	readonly getImageUrl = getImageUrl

	tableHandler = useTableHandler(
		this.ramService.rams, [
		'manufacturer', 'model', 'ram_type', 'modules',
		'speed', 'cas_latency', 'voltage', 'price'
	])

	rams = this.tableHandler.filteredData
	searchTerm = this.tableHandler.searchTerm
	isLoading = this.ramService.isLoading

	user = computed(() => this.authService.user())
	managementRoles = [userProfile.ADMIN]

	ngOnInit() { this.ramService.getAll() }

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return
		this.router.navigate(['/ram', id, slug])
	}
}

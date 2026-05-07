import { CommonModule } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { PartService } from '../../../../shared/services/part.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { userProfile } from '../../../../shared/models/user.model'
import { useTableHandler } from '../../../../shared/utils/table-handler.util'
import { getImageUrl } from '../../../../shared/utils/image-mapper'

@Component({
	selector: 'app-parts',
	imports: [CommonModule, RouterModule],
	templateUrl: './parts.html',
})
export default class Parts {
	private readonly router = inject(Router)
	private readonly partService = inject(PartService)
	private readonly authService = inject(AuthService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)

	readonly getImageUrl = getImageUrl
	tableHandler = useTableHandler(this.partService.parts, ['name'])

	parts = this.tableHandler.filteredData
	searchTerm = this.tableHandler.searchTerm
	isLoading = this.partService.isLoading


	user = computed(() => this.authService.user())
	managementRoles = [userProfile.ADMIN]

	ngOnInit() { this.partService.getAll() }

}

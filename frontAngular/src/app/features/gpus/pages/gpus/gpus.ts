import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { GpuService } from '../../../../shared/services/gpu.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { useTableHandler } from '../../../../shared/utils/table-handler.util'
import { userProfile } from '../../../../shared/models/user.model'
import { getImageUrl } from '../../../../shared/utils/image-mapper'

@Component({
	selector: 'app-gpus',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './gpus.html',
})
export default class Gpus {
	private readonly router = inject(Router)
	private readonly gpuService = inject(GpuService)
	private readonly authService = inject(AuthService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)
	readonly getImageUrl = getImageUrl

	tableHandler = useTableHandler(
		this.gpuService.gpus, [
		'manufacturer', 'model', 'gpu_type', 'base_freq',
		'boost_freq', 'memory', 'memory_type', 'interface',
		'frame_sync', 'tdp', 'ports', 'external_power', 'price'
	])

	gpus = this.tableHandler.filteredData
	searchTerm = this.tableHandler.searchTerm
	isLoading = this.gpuService.isLoading

	user = computed(() => this.authService.user())
	managementRoles = [userProfile.ADMIN]

	ngOnInit() { this.gpuService.getAll() }

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return
		this.router.navigate(['/gpu', id, slug])
	}
}

import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { GpuService } from '../../../../shared/services/gpu.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { getImageUrl } from '../../../../shared/utils/image-mapper'
import { BuildService } from '../../../../shared/services/build.service'

@Component({
	selector: 'app-gpu',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './gpu.html'
})
export default class Gpu {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly gpuService = inject(GpuService)
	private readonly authService = inject(AuthService)
	private readonly buildService = inject(BuildService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)
	readonly getImageUrl = getImageUrl

	gpu = this.gpuService.selectedGpu
	currentUser = this.authService.user
	isLoading = this.gpuService.isLoading

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')
		if (id) this.loadGpu(id)
	}

	loadGpu(id: string) {
		this.gpuService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error')
				this.router.navigate(['gpu/all'])
			}
		})
	}
addToBuild(){
		const currentGpu = this.gpu()
		if(currentGpu){
			this.buildService.addPart('gpu',currentGpu)

			this.toast.show(`${currentGpu.model} añadido a la build`,'success')

			const buildId = this.buildService.currentBuild()._id

    if (buildId) {
      this.router.navigate(['/build/edit', buildId])
    } else {
      this.router.navigate(['/build/new'])
    }
		}
	}
}

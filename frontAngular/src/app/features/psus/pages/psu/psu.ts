import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { PsuService } from '../../../../shared/services/psu.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { getImageUrl } from '../../../../shared/utils/image-mapper'
import { BuildService } from '../../../../shared/services/build.service'

@Component({
	selector: 'app-psu',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './psu.html'
})
export default class Psu {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly psuService = inject(PsuService)
	private readonly authService = inject(AuthService)
	private readonly buildService = inject(BuildService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)

	psu = this.psuService.selectedPsu
	currentUser = this.authService.user
	isLoading = this.psuService.isLoading
	readonly getImageUrl = getImageUrl

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')
		if (id) this.loadPsu(id)
	}

	loadPsu(id: string) {
		this.psuService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error')
				this.router.navigate(['psu/all'])
			}
		})
	}
addToBuild(){
		const currentPsu = this.psu()
		if(currentPsu){
			this.buildService.addPart('psu',currentPsu)

			this.toast.show(`${currentPsu.model} añadido a la build`,'success')

			const buildId = this.buildService.currentBuild()._id

    if (buildId) {
      this.router.navigate(['/build/edit', buildId])
    } else {
      this.router.navigate(['/build/new'])
    }
		}
	}
}

import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { OsService } from '../../../../shared/services/os.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { getImageUrl } from '../../../../shared/utils/image-mapper'
import { BuildService } from '../../../../shared/services/build.service'

@Component({
	selector: 'app-os',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './os.html'
})
export default class Os {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly osService = inject(OsService)
	private readonly authService = inject(AuthService)
	private readonly buildService = inject(BuildService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)
	readonly getImageUrl = getImageUrl

	os = this.osService.selectedOs
	currentUser = this.authService.user
	isLoading = this.osService.isLoading

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id')
		if (id) this.loadOs(id)
	}

	loadOs(id: string) {
		this.osService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error')
				this.router.navigate(['os/all'])
			}
		})
	}
addToBuild(){
		const currentOs = this.os()
		if(currentOs){
			this.buildService.addPart('os',currentOs)

			this.toast.show(`${currentOs.version} añadido a la build`,'success')

			const buildId = this.buildService.currentBuild()._id

    if (buildId) {
      this.router.navigate(['/build/edit', buildId])
    } else {
      this.router.navigate(['/build/new'])
    }
		}
	}
}

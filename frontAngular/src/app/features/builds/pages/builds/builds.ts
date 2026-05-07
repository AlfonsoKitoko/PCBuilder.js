import { CommonModule, CurrencyPipe } from '@angular/common'
import { Component, computed, effect, inject } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { BuildService } from '../../../../shared/services/build.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ModalService } from '../../../../shared/services/modal.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { useTableHandler } from '../../../../shared/utils/table-handler.util'
import { userProfile } from '../../../../shared/models/user.model'
import { getImageUrl } from '../../../../shared/utils/image-mapper'
import { cpuManufacturer, gpuType } from '../../../../shared/constants/index.constant'

@Component({
	selector: 'app-builds',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './builds.html',
})
export default class Builds {
	private readonly router = inject(Router)
	private readonly route = inject(ActivatedRoute)
	private readonly buildService = inject(BuildService)
	private readonly authService = inject(AuthService)
	private readonly modal = inject(ModalService)
	private readonly toast = inject(ToastService)

	readonly getImageUrl = getImageUrl

	private readonly buildsSearchable = computed(() =>
		this.buildService.builds().map(b => ({
			...b,
			ownerName: b.owner?.username || 'Desconocido'
		}))
	)

	tableHandler = useTableHandler(
		this.buildsSearchable, [
		'name', 'totalPrice','ownerName','totalWattage'
	])


	constructor() {
    // Este log saltará cada vez que las builds se actualicen
    effect(() => {
      const data = this.tableHandler.filteredData()
      if (data.length > 0) {
        console.log('--- DEBUG BUILDS DATA ---')
        console.log('Primera build completa:', data[0])
        console.log('¿Tiene slug el case?:', data[0].case?.slug)
        console.log('Tipo de dato en case:', typeof data[0].case)
      }
    })
  }

	builds = this.tableHandler.filteredData
	searchTerm = this.tableHandler.searchTerm
	isLoading = this.buildService.isLoading

	user = computed(() => this.authService.user())
	managementRoles = [userProfile.ADMIN]

	ngOnInit() {
		this.route.url.subscribe(()=>{
			const path=this.route.snapshot.routeConfig?.path
			const userId =this.route.snapshot.paramMap.get('userId')

			if(path==='mine'){
				this.buildService.getMine()
			} else if(userId){
				this.buildService.getUserBuilds(userId)
			} else {
				this.buildService.getAll()
			}
		})
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return
		this.router.navigate(['/build', id, slug])
	}

	// Importa tus enums si están en otro archivo
// import { gpuType, cpuManufacturer } from '../../shared/models/hardware.enums'

getBuildIdentity(build: any) {
  // Obtenemos los valores que vienen del backend
  const cpuBrand = build.cpu?.manufacturer;
  const gpuKind = build.gpu?.gpu_type;

  const brandColors: Record<string, string> = {
    intel: '#0071c5',				// Intel azul
    amd: '#ed1c24',					// AMD rojo
    nvidia: '#76b900',			// NVIDIA verde
    ['default']: '#9ca3af'	// default gris
  };

  // Comparación directa contra los Enums
  const isIntelCpu = cpuBrand === cpuManufacturer.intel;
  const isAmdCpu = cpuBrand === cpuManufacturer.amd;

  const isNvidiaGpu = gpuKind === gpuType.nvidia;
  const isAmdGpu = gpuKind === gpuType.amd;
  const isIntelGpu = gpuKind === gpuType.intel;

  // Asignación de claves para los colores
  const cpuKey = isIntelCpu ? 'intel' : isAmdCpu ? 'amd' : 'default';
  const gpuKey = isNvidiaGpu ? 'nvidia' : isAmdGpu ? 'amd' : isIntelGpu ? 'intel' : 'default';

  return {
    cpuColor: brandColors[cpuKey],
    gpuColor: brandColors[gpuKey],

    // Clases para el HTML (opcionales si usas la estructura de gradientes)
    cpuClass: isIntelCpu ? 'border-l-blue-500' : isAmdCpu ? 'border-l-red-500' : 'border-l-base-300',
    gpuClass: isNvidiaGpu ? 'border-r-green-500' : isAmdGpu ? 'border-r-red-500' : isIntelGpu ? 'border-r-blue-500' : 'border-r-base-300'
  };
}
}

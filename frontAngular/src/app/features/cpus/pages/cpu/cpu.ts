import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { CpuService } from '../../../../shared/services/cpu.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-cpu',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './cpu.html',
})
export default class Cpu {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly cpuService = inject(CpuService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	cpu = this.cpuService.selectedCpu;
	currentUser = this.authService.user;
	isLoading = this.cpuService.isLoading;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadCpu(id);
	}

	loadCpu(id: string) {
		this.cpuService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error');
				this.router.navigate(['cpu/all']);
			},
		});
	}

	addToBuild() {
		const currentCpu = this.cpu();
		if (currentCpu) {
			this.buildService.addPart('cpu', currentCpu);

			this.toast.show(`${currentCpu.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}
}

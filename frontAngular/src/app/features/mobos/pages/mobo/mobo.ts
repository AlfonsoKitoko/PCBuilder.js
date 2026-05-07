import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { MoboService } from '../../../../shared/services/mobo.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-mobo',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './mobo.html',
})
export default class Mobo {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly moboService = inject(MoboService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	mobo = this.moboService.selectedMobo;
	currentUser = this.authService.user;
	isLoading = this.moboService.isLoading;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadMobo(id);
	}

	loadMobo(id: string) {
		this.moboService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar Placa Base', 'error');
				this.router.navigate(['mobo/all']);
			},
		});
	}
	addToBuild() {
		const currentMobo = this.mobo();
		if (currentMobo) {
			this.buildService.addPart('mobo', currentMobo);

			this.toast.show(`${currentMobo.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}
}

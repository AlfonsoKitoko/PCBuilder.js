import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-build',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './build.html',
})
export default class Build {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly buildService = inject(BuildService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	build = this.buildService.selectedBuild;
	currentUser = computed(() => this.authService.user());
	isLoading = this.buildService.isLoading;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadBuild(id);
	}

	loadBuild(id: string) {
		this.buildService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar Build', 'error');
				this.router.navigate(['build/all']);
			},
		});
		console.log(this.build);
	}

	goToDetail(type: string | undefined, id: string | undefined, slug: string | undefined) {
		console.log('Datos recibidos:', { type, id, slug });
		if (!id) return;

		const routeType = type === 'mobo' ? 'motherboard' : type;

		this.router.navigate(['/', routeType, id, slug]);
	}
}

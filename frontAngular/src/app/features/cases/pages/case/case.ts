import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { CaseService } from '../../../../shared/services/case.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

@Component({
	selector: 'app-case',
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './case.html',
})
export default class Case {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly caseService = inject(CaseService);
	private readonly authService = inject(AuthService);
	private readonly buildService = inject(BuildService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);
	readonly getImageUrl = getImageUrl;

	case = this.caseService.selectedCase;
	currentUser = computed(() => this.authService.user());
	isLoading = this.caseService.isLoading;

	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => this.managementRoles.includes(this.currentUser()!.profile as userProfile));

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadCase(id);
	}

	loadCase(id: string) {
		this.caseService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error');
				this.router.navigate(['case/all']);
			},
		});
	}

	addToBuild() {
		const currentCase = this.case();
		if (currentCase) {
			this.buildService.addPart('case', currentCase);

			this.toast.show(`${currentCase.manufacturer} ${currentCase.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}

	async deleteCase() {
		const currentCase = this.case();
		if (!currentCase) return;

		const confirmed = await this.modal.confirm({
			title: '¿Eliminar Componente?',
			message: `¿Quieres borrar permanentemente ${currentCase.manufacturer} ${currentCase.model}?`,
			confirmLabel: 'Eliminar',
			cancelLabel: 'Cancelar',
		});

		if (confirmed) {
			this.caseService.delete(currentCase._id!).subscribe({
				next: () => {
					this.toast.show('Caja eliminada', 'success');
					this.router.navigate(['/case/all']);
				},
				error: () => this.toast.show('Error al elminiar', 'error'),
			});
		}
	}
}

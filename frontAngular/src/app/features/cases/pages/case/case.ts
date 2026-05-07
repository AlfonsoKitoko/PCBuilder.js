import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
	currentUser = this.authService.user;
	isLoading = this.caseService.isLoading;

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

			this.toast.show(`${currentCase.model} añadido a la build`, 'success');

			const buildId = this.buildService.currentBuild()._id;

			if (buildId) {
				this.router.navigate(['/build/edit', buildId]);
			} else {
				this.router.navigate(['/build/new']);
			}
		}
	}
}

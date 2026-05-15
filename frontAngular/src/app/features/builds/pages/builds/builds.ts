import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserService } from '../../../../shared/services/user.service';
import { getBuildIdentity } from '../../../../shared/utils/brand-styles';
import { getImageUrl } from '../../../../shared/utils/image-mapper';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-builds',
	standalone: true,
	imports: [CommonModule, RouterModule, CurrencyPipe],
	templateUrl: './builds.html',
})
export default class Builds implements OnInit {
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private readonly buildService = inject(BuildService);
	private readonly userService = inject(UserService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;
	readonly getBuildIdentity = getBuildIdentity;

	readonly isMinePage = signal(false);
	readonly targetUserId = signal<string | null>(null);

	readonly pageTexts = computed(() => {
		if (this.isMinePage()) {
			return {
				title: 'Mis',
				titleHighlight: 'Builds',
				description: 'Gestiona tus builds personales y su visibilidad',
			};
		}

		const userId = this.targetUserId();
		const selectedUser = this.userService.selectedUser();

		if (userId && selectedUser) {
			return {
				title: 'Builds de',
				titleHighlight: selectedUser.username,
				description: `builds hechas por ${selectedUser.username}`,
			};
		}

		return {
			title: 'Builds de la',
			titleHighlight: 'comunidad',
			description: 'Explora las builds hechas por otros usuarios',
		};
	});

	private readonly buildsSearchable = computed(() =>
		this.buildService.builds().map((b) => ({
			...b,
			ownerName: b.owner?.username || 'Desconocido',
		})),
	);

	tableHandler = useTableHandler(this.buildsSearchable, ['name', 'totalPrice', 'ownerName', 'totalWattage']);

	builds = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.buildService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	constructor() {
		effect(() => {
			const data = this.tableHandler.filteredData();
			if (data.length > 0) {
				console.log('--- DEBUG BUILDS DATA ---');
				console.log('Primera build:', data[0]);
			}
		});
	}

	ngOnInit() {
		// La clave está aquí: cada vez que la URL cambie, actualizamos el signal y cargamos datos
		this.route.url.subscribe(() => {
			const path = this.route.snapshot.routeConfig?.path;
			const userId = this.route.snapshot.paramMap.get('userId');

			// Actualizamos el estado visual
			this.isMinePage.set(path === 'mine');
			this.targetUserId.set(userId);

			// Cargamos los datos correspondientes
			if (path === 'mine') {
				this.buildService.getMine();
			} else if (userId) {
				this.buildService.getUserBuilds(userId);
				this.userService.getById(userId).subscribe();
			} else {
				this.buildService.getAll();
			}
		});
	}

	goToDetail(id: string | undefined, slug: string | undefined) {
		if (!id) return;
		this.router.navigate(['/build', id, slug]);
	}
}

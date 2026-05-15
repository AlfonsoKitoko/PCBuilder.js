import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
	selector: 'app-user',
	imports: [CommonModule, RouterModule],
	templateUrl: './user.html',
})
export default class User {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	public readonly userService = inject(UserService);
	private readonly buildService = inject(BuildService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	user = this.userService.selectedUser;
	currentUser = computed(() => this.authService.user());
	isLoading = this.userService.isLoading;

	managementRoles = [userProfile.ADMIN];

	canManage = computed(() => {
		const user = this.currentUser();
		return user ? this.managementRoles.includes(user.profile as userProfile) : false;
	});

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadUser(id);
		this.buildService.getAll();
	}

	loadUser(id: string) {
		this.userService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error');
				this.router.navigate(['user/all']);
			},
		});
	}

	async onDeleteAccount(id: string) {
		const confirmed = await this.modal.confirm({
			title: '¿Eliminar cuenta?',
			message: 'Esta acción es irreversible...',
			// ...
		});

		if (!confirmed) return;

		this.userService.delete(id).subscribe({
			next: () => {
				this.toast.show('Cuenta eliminada correctamente', 'success');

				if (id === this.currentUser()?._id) {
					this.authService.logout().subscribe(() => {
						this.router.navigate(['/']);
					});
				} else {
					this.router.navigate(['/user/all']);
				}
			},
			error: (err) => {
				this.toast.show(err.error?.message || 'Error', 'error');
			},
		});
	}
}

import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { BuildService } from '../../../../shared/services/build.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserService } from '../../../../shared/services/user.service';
import { useTableHandler } from '../../../../shared/utils/table-handler.util';

@Component({
	selector: 'app-users',
	imports: [CommonModule, RouterModule],
	templateUrl: './users.html',
})
export default class Users {
	private readonly router = inject(Router);
	public readonly userService = inject(UserService);
	private readonly buildService = inject(BuildService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	tableHandler = useTableHandler(this.userService.users, [
		'username',
		'firstName',
		'lastName',
		'email',
		'birthDate',
		'profile',
	]);

	users = this.tableHandler.filteredData;
	searchTerm = this.tableHandler.searchTerm;
	isLoading = this.userService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	ngOnInit() {
		this.userService.getAll();
		this.buildService.getAll();
	}

	goToDetail(id: string | undefined) {
		if (!id) return;

		const currentUser = this.user();

		const isAdmin = currentUser?.profile === userProfile.ADMIN;
		const isOwnProfile = currentUser?._id === id;

		if (isAdmin || isOwnProfile) this.router.navigate(['/user', id]);
		else this.toast.show('No tienes permiso para ver los perfiles de otros usuarios', 'error');
	}
}

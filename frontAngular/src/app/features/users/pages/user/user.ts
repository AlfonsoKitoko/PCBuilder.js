import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
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
	private readonly userService = inject(UserService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	user = this.userService.selectedUser;
	currentUser = this.authService.user;
	isLoading = this.userService.isLoading;

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) this.loadUser(id);
	}

	loadUser(id: string) {
		this.userService.getById(id).subscribe({
			error: (err) => {
				this.toast.show('Error al cargar CPU', 'error');
				this.router.navigate(['user/all']);
			},
		});
	}
}

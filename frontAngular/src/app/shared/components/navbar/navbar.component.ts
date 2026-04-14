import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-navbar',
	imports: [CommonModule, RouterModule],
	templateUrl: './navbar.component.html',
})
export class NavbarComponent {
	private authService = inject(AuthService);
	private router = inject(Router);

	user = computed(() => this.authService.user());
	private readonly managementRoles = ['ADMINISTRATOR'];

	get isManager(): boolean {
		const currentUser = this.user();
		return !!currentUser && this.managementRoles.includes(currentUser.profile);
	}

	logout() {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigate(['/auth/login']);
			},
			error: (err) => {
				console.error('Error durante el logout:', err);
				this.router.navigate(['/auth/login']);
			},
		});
	}
}

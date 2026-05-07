import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-navbar',
	imports: [CommonModule, RouterModule],
	templateUrl: './navbar.component.html',
})
export class NavbarComponent {
	private authService = inject(AuthService);
	private router = inject(Router);

	isDarkMode = signal<boolean>(false);

	user = computed(() => this.authService.user());
	private readonly managementRoles = [userProfile.ADMIN];

	ngOnInit() {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;

		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) this.setDarkTheme(true);
	}

	get isManager(): boolean {
		const currentUser = this.user();
		return !!currentUser && this.managementRoles.includes(currentUser.profile);
	}

	toggleTheme() {
		this.setDarkTheme(!this.isDarkMode());
	}

	private setDarkTheme(isDark: boolean) {
		this.isDarkMode.set(isDark);
		const themeName = isDark ? 'dark' : 'light';

		document.documentElement.setAttribute('data-theme', themeName);

		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		localStorage.setItem('theme', themeName);

		this.updateFavicon(themeName);
	}

	private updateFavicon(theme: string) {
		const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

		if (favicon) favicon.href = theme === 'dark' ? 'favicon-dark.ico' : 'favicon-light.ico';
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

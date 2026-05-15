import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const toast = inject(ToastService);

	// Verifica si hay token en el servicio de autenticación
	if (authService.isAuthenticated()) return true;

	toast.show(`Necesitas iniciar sesión para poder acceder a esta sección`, 'error');

	// De no haber token, redirige al login
	router.navigate(['/auth/login'], {
		queryParams: { returnUrl: state.url },
	});

	return false;
};

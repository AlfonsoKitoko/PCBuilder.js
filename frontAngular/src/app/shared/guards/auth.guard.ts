import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { inject } from "@angular/core"

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService)
	const router = inject(Router)

	// Verifica si hay token en el servicio de autenticación
	if (authService.token()) return true

	// De no haber token, redirige al login
	router.navigate(['/auth/login'], {
		queryParams: { returnUrl: state.url }
	})
	return false
}

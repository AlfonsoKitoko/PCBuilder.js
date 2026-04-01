import { Routes } from "@angular/router"

export const routes: Routes = [
	// Login usuarios
	{ path: 'login', loadComponent: () => import('./pages/login/login') },

	// Registro usuarios nuevos
	{ path: 'register', loadComponent: () => import('./pages/register/register') }
]

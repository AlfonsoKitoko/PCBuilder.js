import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las users -> /users
	{ path: 'all', loadComponent: () => import('./pages/users/users') },

	// Crear user -> /users
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar user (ID) -> /users/id-user
	{ path: 'edit/:id', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles user (ID) -> /users/id-user
	{ path: ':id', loadComponent: () => import('./pages/user/user') },
]

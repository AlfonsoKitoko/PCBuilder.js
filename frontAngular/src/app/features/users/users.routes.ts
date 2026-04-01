import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las users -> /users
	{ path: '', loadComponent: () => import('./pages/users/users') },

	// Detalles user (ID) -> /users/id-user
	{ path: '/:id', loadComponent: () => import('./pages/user/user') },

	// Crear user -> /users
	{ path: '/', loadComponent: () => import('./pages/new/new') },

	// Actualizar user (ID) -> /users/id-user
	{ path: '/edit/:id', loadComponent: () => import('./pages/edit/edit') },
]

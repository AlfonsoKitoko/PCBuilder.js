import { Routes } from '@angular/router'

export const routes: Routes = [
	// Todas las builds (público) -> /builds/all
	{ path: 'all', loadComponent: () => import('./pages/builds/builds') },

	// Mis builds (login) -> /builds/mine
	{ path: 'mine', loadComponent: () => import('./pages/builds/builds') },

	// Crear build
	{ path: 'new', loadComponent: () => import('./pages/new/new') },

	// Detalles build (ID) -> /builds/id-build
	{ path: ':id', loadComponent: () => import('./pages/build/build') },

	// Editar build (ID) -> /builds/edit/id-build
	{ path: 'edit/:id', loadComponent: () => import('./pages/edit/edit') },

	// Builds de otros usuarios -> /builds/user/id-del-usuario
	{ path: 'user/:userId', loadComponent: () => import('./pages/builds/builds') },
]

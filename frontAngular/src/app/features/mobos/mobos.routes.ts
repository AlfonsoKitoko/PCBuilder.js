import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las moboss -> /mobos
	{ path: '', loadComponent: () => import('./pages/mobos/mobos') },

	// Detalles mobos (ID) -> /mobos/id-mobo
	{ path: '/:id', loadComponent: () => import('./pages/mobo/mobo') },

	// Crear mobos -> /mobos
	{ path: '/', loadComponent: () => import('./pages/new/new') },

	// Actualizar mobos (ID) -> /mobos/id-mobo
	{ path: '/edit/:id', loadComponent: () => import('./pages/edit/edit') },
]

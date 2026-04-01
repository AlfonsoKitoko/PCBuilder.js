import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las cpus -> /cpus
	{ path: '', loadComponent: () => import('./pages/cpus/cpus') },

	// Detalles cpu (ID) -> /cpus/id-cpu
	{ path: '/:id', loadComponent: () => import('./pages/cpu/cpu') },

	// Crear cpu -> /cpus
	{ path: '/', loadComponent: () => import('./pages/new/new') },

	// Actualizar cpu (ID) -> /cpus/id-cpu
	{ path: '/edit/:id', loadComponent: () => import('./pages/edit/edit') },
]

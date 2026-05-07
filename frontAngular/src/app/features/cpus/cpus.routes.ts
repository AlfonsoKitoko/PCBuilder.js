import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las cpus -> /cpu
	{ path: 'all', loadComponent: () => import('./pages/cpus/cpus') },

	// Crear cpu -> /cpu
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar cpu (ID) -> /cpu/idCpu/cpuSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles cpu (ID) -> /cpu/idCpu/cpuSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/cpu/cpu') },
]

import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las moboss -> /mobo
	{ path: 'all', loadComponent: () => import('./pages/mobos/mobos') },

	// Crear mobos -> /mobo
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar mobos (ID) -> /mobo/idMobo/moboSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles mobo (ID) -> /mobo/idMobo/moboSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/mobo/mobo') },
]

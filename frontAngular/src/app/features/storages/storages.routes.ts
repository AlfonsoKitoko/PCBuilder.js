import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las storages -> /storage
	{ path: 'all', loadComponent: () => import('./pages/storages/storages') },

	// Crear storage -> /storage
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar storage (ID) -> /storage/idStorage/storageSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles storage (ID) -> /storage/idStorage/storageSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/storage/storage') },
]

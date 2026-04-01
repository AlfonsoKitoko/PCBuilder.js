import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las storages -> /storages
	{ path: '', loadComponent: () => import('./pages/storages/storages') },

	// Detalles storage (ID) -> /storages/id-storage
	{ path: '/:id', loadComponent: () => import('./pages/storage/storage') },

	// Crear storage -> /storages
	{ path: '/', loadComponent: () => import('./pages/new/new') },

	// Actualizar storage (ID) -> /storages/id-storage
	{ path: '/edit/:id', loadComponent: () => import('./pages/edit/edit') },
]

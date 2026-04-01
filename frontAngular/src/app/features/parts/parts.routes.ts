import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las partes -> /parts
	{ path: '', loadComponent: () => import('./pages/parts/parts') },

	// Detalles parte (ID) -> /parts/id-part
	{ path: '/:id', loadComponent: () => import('./pages/part/part') },

	// Crear parte -> /parts
	{ path: '/', loadComponent: () => import('./pages/new/new') },

	// Actualizar parte (ID) -> /parts/id-part
	{ path: '/edit/:id', loadComponent: () => import('./pages/edit/edit') },
]

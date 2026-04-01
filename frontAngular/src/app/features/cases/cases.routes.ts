import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las cajas -> /cases
	{ path: '', loadComponent: () => import('./pages/cases/cases') },

	// Detalles caja (ID) -> /cases/id-case
	{ path: '/:id', loadComponent: () => import('./pages/case/case') },

	// Crear caja -> /cases
	{ path: '/', loadComponent: () => import('./pages/new/new') },

	// Actualizar caja (ID) -> /cases/id-case
	{ path: '/edit/:id', loadComponent: () => import('./pages/edit/edit') },
]

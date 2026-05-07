import { Routes } from '@angular/router';

export const routes: Routes = [
	// Todas las cajas -> /case
	{ path: 'all', loadComponent: () => import('./pages/cases/cases') },

	// Crear caja -> /case
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar caja (ID) -> /case/idCase/caseSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles caja (ID) -> /case/idCase/caseSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/case/case') },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
	// Todas las partes -> /categories
	{ path: '', loadComponent: () => import('./pages/parts/parts') },

	// Crear parte -> /categories
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar parte (ID) -> /categories/idPart/partSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles parte (ID) -> /categories/idPart/partSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/part/part') },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
	// Todas las rams -> /ram
	{ path: 'all', loadComponent: () => import('./pages/rams/rams') },

	// Crear ram -> /ram
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar ram (ID) -> /ram/idRam/ramSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles ram (ID) -> /ram/idRam/ramSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/ram/ram') },
];

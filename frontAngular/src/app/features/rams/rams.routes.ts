import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const routes: Routes = [
	// Todas las rams -> /ram
	{ path: 'all', loadComponent: () => import('./pages/rams/rams') },

	// Crear ram -> /ram
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Actualizar ram (ID) -> /ram/idRam/ramSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Detalles ram (ID) -> /ram/idRam/ramSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/ram/ram') },
];

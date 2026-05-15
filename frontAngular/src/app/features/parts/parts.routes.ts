import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const routes: Routes = [
	// Todas las partes -> /categories
	{ path: '', loadComponent: () => import('./pages/parts/parts') },

	// Crear parte -> /categories
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Actualizar parte (ID) -> /categories/idPart/partSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Detalles parte (ID) -> /categories/idPart/partSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/part/part') },
];

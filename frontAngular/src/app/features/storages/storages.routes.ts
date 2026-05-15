import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const routes: Routes = [
	// Todas las storages -> /storage
	{ path: 'all', loadComponent: () => import('./pages/storages/storages') },

	// Crear storage -> /storage
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Actualizar storage (ID) -> /storage/idStorage/storageSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Detalles storage (ID) -> /storage/idStorage/storageSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/storage/storage') },
];

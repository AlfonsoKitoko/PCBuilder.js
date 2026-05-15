import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const routes: Routes = [
	// Todas las gpus -> /gpu
	{ path: 'all', loadComponent: () => import('./pages/gpus/gpus') },

	// Crear gpu -> /gpu
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Actualizar gpu (ID) -> /gpu/idGpu/gpuSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Detalles gpu (ID) -> /gpu/idGpu/gpuSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/gpu/gpu') },
];

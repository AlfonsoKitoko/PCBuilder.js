import { Routes } from '@angular/router';

export const routes: Routes = [
	// Todas las gpus -> /gpu
	{ path: 'all', loadComponent: () => import('./pages/gpus/gpus') },

	// Crear gpu -> /gpu
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar gpu (ID) -> /gpu/idGpu/gpuSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles gpu (ID) -> /gpu/idGpu/gpuSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/gpu/gpu') },
];

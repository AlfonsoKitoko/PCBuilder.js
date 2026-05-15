import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const routes: Routes = [
	// Todas las cpus -> /cpu
	{ path: 'all', loadComponent: () => import('./pages/cpus/cpus') },

	// Crear cpu -> /cpu
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Actualizar cpu (ID) -> /cpu/idCpu/cpuSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Detalles cpu (ID) -> /cpu/idCpu/cpuSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/cpu/cpu') },
];

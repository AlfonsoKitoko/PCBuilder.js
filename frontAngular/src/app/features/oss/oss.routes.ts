import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';

export const routes: Routes = [
	// Todas las oss -> /os
	{ path: 'all', loadComponent: () => import('./pages/oss/oss') },

	// Crear os -> /os
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Actualizar os (ID) -> /os/idOs/osSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit'), canActivate: [authGuard] },

	// Detalles os (ID) -> /os/idOs/osSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/os/os') },
];

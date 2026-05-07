import { Routes } from '@angular/router';

export const routes: Routes = [
	// Todas las psus -> /psus
	{ path: 'all', loadComponent: () => import('./pages/psus/psus') },

	// Crear psu -> /psus
	{ path: 'new', loadComponent: () => import('./pages/newedit/newedit') },

	// Actualizar psu (ID) -> /psus/idPsu/psuSlug
	{ path: 'edit/:id/:slug', loadComponent: () => import('./pages/newedit/newedit') },

	// Detalles psu (ID) -> /psus/idPsu/psuSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/psu/psu') },
];

import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las psus -> /psus
	{ path: '', loadComponent: () => import('./pages/psus/psus') },

	// Detalles psu (ID) -> /psus/id-psu
	{ path: '', loadComponent: () => import('./pages/psu/psu') },

	// Crear psu -> /psus
	{ path: '', loadComponent: () => import('./pages/new/new') },

	// Actualizar psu (ID) -> /psus/id-psu
	{ path: '', loadComponent: () => import('./pages/edit/edit') },
]

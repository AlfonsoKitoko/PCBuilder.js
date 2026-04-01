import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las oss -> /oss
	{ path: '', loadComponent: () => import('./pages/oss/oss') },

	// Detalles os (ID) -> /oss/id-os
	{ path: '/:id', loadComponent: () => import('./pages/os/os') },

	// Crear os -> /oss
	{ path: '/', loadComponent: () => import('./pages/new/new') },

	// Actualizar os (ID) -> /oss/id-os
	{ path: '/edit/:id', loadComponent: () => import('./pages/edit/edit') },
]

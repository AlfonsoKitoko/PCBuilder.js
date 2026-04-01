import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las gpus -> /gpus
	{ path: '', loadComponent: () => import('./pages/gpus/gpus') },

	// Detalles gpu (ID) -> /gpus/id-gpu
	{ path: '', loadComponent: () => import('./pages/gpu/gpu') },

	// Crear gpu -> /gpus
	{ path: '', loadComponent: () => import('./pages/new/new') },

	// Actualizar gpu (ID) -> /gpus/id-gpu
	{ path: '', loadComponent: () => import('./pages/edit/edit') },
]

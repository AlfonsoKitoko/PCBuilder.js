import { Routes } from "@angular/router"

export const routes: Routes = [
	// Todas las rams -> /rams
	{ path: '', loadComponent: () => import('./pages/rams/rams') },

	// Detalles ram (ID) -> /rams/id-ram
	{ path: '', loadComponent: () => import('./pages/ram/ram') },

	// Crear ram -> /rams
	{ path: '', loadComponent: () => import('./pages/new/new') },

	// Actualizar ram (ID) -> /rams/id-ram
	{ path: '', loadComponent: () => import('./pages/edit/edit') },
]

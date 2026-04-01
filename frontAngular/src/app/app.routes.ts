import { Routes } from '@angular/router'

export const routes: Routes = [
	{ path: 'landing', loadComponent: () => import('./features/landing/landing') },

	{ path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes) },

	{ path: 'builds', loadChildren: () => import('./features/builds/builds.routes').then(m => m.routes) },

	// { path: 'cpus', loadChildren: () => import('./features/cpu/cpus.routes').then(m => m.routes) },

	// { path: 'mobos', loadChildren: () => import('./features/mobo/mobos.routes').then(m => m.routes) },

	// { path: 'rams', loadChildren: () => import('./features/ram/rams.routes').then(m => m.routes) },

	// { path: 'storages', loadChildren: () => import('./features/storage/storages.routes').then(m => m.routes) },

	// { path: 'gpus', loadChildren: () => import('./features/gpu/gpus.routes').then(m => m.routes) },

	// { path: 'cases', loadChildren: () => import('./features/case/cases.routes').then(m => m.routes) },

	// { path: 'psus', loadChildren: () => import('./features/psu/psus.routes').then(m => m.routes) },

	// { path: 'oss', loadChildren: () => import('./features/os/oss.routes').then(m => m.routes) },

	// { path: 'parts', loadChildren: () => import('./features/part/parts.routes').then(m => m.routes) },

	// { path: 'users', loadChildren: () => import('./features/user/users.routes').then(m => m.routes) },


	{ path: '**', pathMatch: 'full', redirectTo: 'landing' }
]

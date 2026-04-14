import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'landing',
		title: 'PCBuilder - Bienvenido',
		loadComponent: () => import('./features/landing/landing'),
	},

	{
		path: 'auth',
		title: 'PCBuilder - Autenticación',
		loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes),
	},

	{
		path: 'builds',
		title: 'PCBuilder - Mis Builds',
		loadChildren: () => import('./features/builds/builds.routes').then((m) => m.routes),
	},

	{
		path: 'cpus',
		title: 'PCBuilder - Procesadores',
		loadChildren: () => import('./features/cpus/cpus.routes').then((m) => m.routes),
	},

	{
		path: 'mobos',
		title: 'PCBuilder - Placas Base',
		loadChildren: () => import('./features/mobos/mobos.routes').then((m) => m.routes),
	},

	{
		path: 'rams',
		title: 'PCBuilder - Memorias RAM',
		loadChildren: () => import('./features/rams/rams.routes').then((m) => m.routes),
	},

	{
		path: 'storages',
		title: 'PCBuilder - Almacenamiento',
		loadChildren: () => import('./features/storages/storages.routes').then((m) => m.routes),
	},

	{
		path: 'gpus',
		title: 'PCBuilder - Tarjetas Gráficas',
		loadChildren: () => import('./features/gpus/gpus.routes').then((m) => m.routes),
	},

	{
		path: 'cases',
		title: 'PCBuilder - Cajas',
		loadChildren: () => import('./features/cases/cases.routes').then((m) => m.routes),
	},

	{
		path: 'psus',
		title: 'PCBuilder - Fuentes de Alimentación',
		loadChildren: () => import('./features/psus/psus.routes').then((m) => m.routes),
	},

	{
		path: 'oss',
		title: 'PCBuilder - Sistemas Operativos',
		loadChildren: () => import('./features/oss/oss.routes').then((m) => m.routes),
	},

	{
		path: 'parts',
		title: 'PCBuilder - Componentes',
		loadChildren: () => import('./features/parts/parts.routes').then((m) => m.routes),
	},

	{
		path: 'users',
		title: 'PCBuilder - Usuarios',
		loadChildren: () => import('./features/users/users.routes').then((m) => m.routes),
	},

	{ path: '**', pathMatch: 'full', redirectTo: 'landing' },
];

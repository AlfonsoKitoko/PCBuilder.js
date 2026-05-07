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
		path: 'build',
		title: 'PCBuilder - Mis Builds',
		loadChildren: () => import('./features/builds/builds.routes').then((m) => m.routes),
	},

	{
		path: 'cpu',
		title: 'PCBuilder - Procesadores',
		loadChildren: () => import('./features/cpus/cpus.routes').then((m) => m.routes),
	},

	{
		path: 'motherboard',
		title: 'PCBuilder - Placas Base',
		loadChildren: () => import('./features/mobos/mobos.routes').then((m) => m.routes),
	},

	{
		path: 'ram',
		title: 'PCBuilder - Memorias RAM',
		loadChildren: () => import('./features/rams/rams.routes').then((m) => m.routes),
	},

	{
		path: 'storage',
		title: 'PCBuilder - Almacenamiento',
		loadChildren: () => import('./features/storages/storages.routes').then((m) => m.routes),
	},

	{
		path: 'gpu',
		title: 'PCBuilder - Tarjetas Gráficas',
		loadChildren: () => import('./features/gpus/gpus.routes').then((m) => m.routes),
	},

	{
		path: 'case',
		title: 'PCBuilder - Cajas',
		loadChildren: () => import('./features/cases/cases.routes').then((m) => m.routes),
	},

	{
		path: 'psu',
		title: 'PCBuilder - Fuentes de Alimentación',
		loadChildren: () => import('./features/psus/psus.routes').then((m) => m.routes),
	},

	{
		path: 'os',
		title: 'PCBuilder - Sistemas Operativos',
		loadChildren: () => import('./features/oss/oss.routes').then((m) => m.routes),
	},

	{
		path: 'categories',
		title: 'PCBuilder - Categorías',
		loadChildren: () => import('./features/parts/parts.routes').then((m) => m.routes),
	},

	{
		path: 'user',
		title: 'PCBuilder - Usuarios',
		loadChildren: () => import('./features/users/users.routes').then((m) => m.routes),
	},

	{ path: '**', pathMatch: 'full', redirectTo: 'landing' },
];

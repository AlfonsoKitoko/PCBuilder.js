import { Routes } from '@angular/router'
import { authGuard } from '../../shared/guards/auth.guard'

export const routes: Routes = [
	// redirige a build/all
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	// Todas las builds (público) -> /build/all
	{ path: 'all', loadComponent: () => import('./pages/builds/builds'), },

	// Mis builds (login) -> /build/mine (PROTEGIDO)
	{
		path: 'mine',
		loadComponent: () => import('./pages/builds/builds'),
		canActivate: [authGuard]
	 },

	// Crear build (PROTEGIDO)
	{
		path: 'new',
		loadComponent: () => import('./pages/newedit/newedit'),
		canActivate: [authGuard]
	},

	// Editar build (ID) -> /build/edit/idBuild/buildSlug (PROTEGIDO)
	{
		path: 'edit/:id/:slug',
		loadComponent: () => import('./pages/newedit/newedit'),
		canActivate: [authGuard]
	},

	// Builds de otros usuarios -> /builds/user/idUsuario
	{
		path: 'user/:userId',
		loadComponent: () => import('./pages/builds/builds'),
		canActivate: [authGuard]
	},

	// Detalles build (ID) -> /builds/idBuild/buildSlug
	{ path: ':id/:slug', loadComponent: () => import('./pages/build/build'), },
]

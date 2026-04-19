import { Routes } from '@angular/router';

export const routes: Routes = [
	// Login usuarios
	{ path: 'login', loadComponent: () => import('./pages/login/login') },

	// Registro usuarios nuevos
	{ path: 'register', loadComponent: () => import('./pages/register/register') },

	// Olvidó contraseña
	{ path: 'forgot-password', loadComponent: () => import('./pages/forgotPassword/forgotPassword') },

	// Reiniciar contraseña
	{ path: 'reset-password/:token', loadComponent: () => import('./pages/resetPassword/resetPassword') },
];

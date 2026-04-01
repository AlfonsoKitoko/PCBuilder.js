import { Routes } from "@angular/router"

export const routes: Routes = [
	{ path: 'login', loadComponent: () => import('./login/login') },
	{ path: 'register', loadComponent: () => import('./register/register') }
]

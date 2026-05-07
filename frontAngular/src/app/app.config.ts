import {
	ApplicationConfig,
	inject,
	LOCALE_ID,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

registerLocaleData(localeEs, 'es-ES');

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-ES' },
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideAppInitializer(() => {
			const authService = inject(AuthService);
			const token = localStorage.getItem('token');
			if (token && token !== 'undefined') {
				return firstValueFrom(authService.getMe()).catch(() => null);
			}
			return Promise.resolve();
		}),
	],
};

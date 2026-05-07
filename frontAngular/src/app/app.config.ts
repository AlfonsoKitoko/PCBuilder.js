import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './shared/interceptors/auth.interceptor'

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common'
import { AuthService } from './shared/services/auth.service'
import { firstValueFrom } from 'rxjs'

registerLocaleData(localeEs, 'es-ES')

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-ES' },
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideAppInitializer(() => {
			const authService = inject(AuthService)
			const token = localStorage.getItem('token')
			if (token && token !== 'undefined') {
				return firstValueFrom(authService.getMe()).catch(() => null)
			}
			return Promise.resolve()
		})
	]
}

import { HttpInterceptorFn } from "@angular/common/http"

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = localStorage.getItem('token')

	if (token && token !== 'undefined') {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		})
	}
	return next(req)
}

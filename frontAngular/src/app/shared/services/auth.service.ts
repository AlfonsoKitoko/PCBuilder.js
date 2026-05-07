import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { ToastService } from './toast.service';

export interface AuthData {
	user: User;
	token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient);
	private toast = inject(ToastService);
	private apiUrl = `${environment.apiUrl}/auth`;

	isLoading = signal(false);

	user = signal<User | null>(null);
	token = signal<string | null>(null);
	isAuthenticated = computed(() => !!this.user());

	constructor() {}

	getMe(): Observable<User> {
		return this.http.get<ApiResponse<User>>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
			map((res) => res.data),
			tap((user) => this.user.set(user)),
		);
	}

	private setSession(authResponse: ApiResponse<AuthData>): void {
		const { user, token } = authResponse.data || {};

		if (user && token) {
			this.user.set(user);
			this.token.set(token);
			localStorage.setItem('token', token);
			this.toast.show(`¡Bienvenido de nuevo, ${user.username}!`, 'success');
		} else {
			this.clearSession();
		}
	}

	private clearSession(): void {
		this.user.set(null);
		this.token.set(null);
		localStorage.removeItem('token');
	}

	login(credentials: { email: string; password: string }): Observable<ApiResponse<AuthData>> {
		this.isLoading.set(true);

		return this.http.post<ApiResponse<AuthData>>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
			tap((res) => {
				this.setSession(res);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				this.toast.show(err.error?.message || 'Error al inciar sesión');
				return throwError(() => err);
			}),
		);
	}

	register(userData: User): Observable<ApiResponse<AuthData>> {
		return this.http
			.post<ApiResponse<AuthData>>(`${this.apiUrl}/register`, userData, { withCredentials: true })
			.pipe(tap((response) => this.setSession(response)));
	}

	logout(): Observable<any> {
		return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
			tap(() => {
				this.clearSession();
				this.toast.show('Sesión cerrada correctamente', 'info');
			}),
			catchError((err) => {
				this.clearSession();
				throw err;
			}),
		);
	}

	forgotPassword(email: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/forgot-password`, email);
	}

	verifyResetToken(token: string): Observable<any> {
		return this.http.get<ApiResponse<any>>(`${this.apiUrl}/reset-password/${token}`);
	}

	resetPassword(token: string, body: { password: string }): Observable<any> {
		return this.http.post(`${this.apiUrl}/reset-password/${token}`, body);
	}
}

import { computed, inject, Injectable, signal } from '@angular/core'
import { User } from '../models/user.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { Observable, tap } from 'rxjs'

export interface AuthResponse {
	message: string
	user: User
	token: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient)
	private apiUrl = `${environment.apiUrl}/auth`

	user = signal<User | null>(null)
	token = signal<string | null>(null)
	isAuthenticated = computed(() => !!this.user())

	constructor() {
		const savedToken = localStorage.getItem('token')

		if (savedToken) {
			this.getMe().subscribe({
				next: (user) => this.user.set(user),
				error: () => this.clearSession()
			})
		}
	}

	getMe(): Observable<User> {
		return this.http
			.get<User>(`${this.apiUrl}/me`, { withCredentials: true })
			.pipe(tap((user) => this.user.set(user)))
	}

	private setSession(authResponse: AuthResponse): void {
		this.user.set(authResponse.user)
		this.token.set(authResponse.token)
		localStorage.setItem('token', authResponse.token)
	}

	private clearSession(): void {
		this.user.set(null)
		this.token.set(null)
		localStorage.removeItem('token')
	}

	login(credentials: { email: string, password: string }): Observable<AuthResponse> {
		return this.http
			.post<AuthResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
			.pipe(tap((authResponse) => this.setSession(authResponse)))
	}

	register(userData: User): Observable<AuthResponse> {
		return this.http
			.post<AuthResponse>(`${this.apiUrl}/register`, userData, { withCredentials: true })
			.pipe(tap((response) => this.setSession(response)))
	}

	logout(): Observable<any> {
		return this.http
			.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
			.pipe(tap(() => this.clearSession()))
	}
}

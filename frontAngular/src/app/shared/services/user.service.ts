import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { BuildService } from './build.service';

@Injectable({ providedIn: 'root' })
export class UserService {
	private http = inject(HttpClient);
	private apiUrl = `${environment.apiUrl}/user`;
	private readonly buildService = inject(BuildService);

	users = signal<User[]>([]);
	selectedUser = signal<User | null>(null);
	isLoading = signal(false);

	getUserBuildCount(userId: string | undefined): number {
		if (!userId) return 0;

		const builds = this.buildService.builds();
		if (!builds) return 0;

		return builds.filter((b) => {
			// Si owner es un objeto (populate), usamos b.owner._id
			// Si owner es un string, lo usamos directamente
			const ownerId = typeof b.owner === 'object' ? b.owner?._id : b.owner;
			return ownerId === userId;
		}).length;
	}

	getAll() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<User[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.users.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener CPUs:', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<User>> {
		const cachedUser = this.users().find((u) => u._id === id);
		if (cachedUser) this.selectedUser.set(cachedUser);
		else this.selectedUser.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedUser.set(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newUser: User): Observable<ApiResponse<User>> {
		this.isLoading.set(true);

		return this.http.post<ApiResponse<User>>(this.apiUrl, newUser, { withCredentials: true }).pipe(
			tap((res) => {
				this.users.update((c) => [...c, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedUser: Partial<User>): Observable<ApiResponse<User>> {
		this.isLoading.set(true);

		return this.http.patch<ApiResponse<User>>(`${this.apiUrl}/${id}`, updatedUser, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data;
				this.users.update((list) => list.map((c) => (c._id === id ? updated : c)));

				this.selectedUser.set(updated);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	delete(id: string): Observable<ApiResponse<User>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.users.update((list) => list.filter((c) => c._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

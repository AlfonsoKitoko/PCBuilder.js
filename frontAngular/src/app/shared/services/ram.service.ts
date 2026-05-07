import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { Ram } from '../models/ram.model';

@Injectable({ providedIn: 'root' })
export class RamService {
	private http = inject(HttpClient);
	private apiUrl = `${environment.apiUrl}/ram`;

	rams = signal<Ram[]>([]);
	selectedRam = signal<Ram | null>(null);
	isLoading = signal(false);

	getAll() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Ram[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.rams.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener CPUs:', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<Ram>> {
		const cachedRam = this.rams().find((r) => r._id === id);
		if (cachedRam) this.selectedRam.set(cachedRam);
		else this.selectedRam.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<Ram>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedRam.set(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newRam: Ram): Observable<ApiResponse<Ram>> {
		this.isLoading.set(true);

		return this.http.post<ApiResponse<Ram>>(this.apiUrl, newRam, { withCredentials: true }).pipe(
			tap((res) => {
				this.rams.update((c) => [...c, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedRam: Partial<Ram>): Observable<ApiResponse<Ram>> {
		this.isLoading.set(true);

		return this.http.patch<ApiResponse<Ram>>(`${this.apiUrl}/${id}`, updatedRam, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data;
				this.rams.update((list) => list.map((c) => (c._id === id ? updated : c)));

				this.selectedRam.set(updated);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	delete(id: string): Observable<ApiResponse<Ram>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<Ram>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.rams.update((list) => list.filter((c) => c._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

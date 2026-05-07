import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { Mobo } from '../models/mobo.model';

@Injectable({ providedIn: 'root' })
export class MoboService {
	private http = inject(HttpClient);
	private apiUrl = `${environment.apiUrl}/mobo`;

	mobos = signal<Mobo[]>([]);
	selectedMobo = signal<Mobo | null>(null);
	isLoading = signal(false);

	getAll() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Mobo[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.mobos.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener CPUs:', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<Mobo>> {
		const cachedMobo = this.mobos().find((m) => m._id === id);
		if (cachedMobo) this.selectedMobo.set(cachedMobo);
		else this.selectedMobo.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<Mobo>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedMobo.set(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newMobo: Mobo): Observable<ApiResponse<Mobo>> {
		this.isLoading.set(true);

		return this.http.post<ApiResponse<Mobo>>(this.apiUrl, newMobo, { withCredentials: true }).pipe(
			tap((res) => {
				this.mobos.update((c) => [...c, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedMobo: Partial<Mobo>): Observable<ApiResponse<Mobo>> {
		this.isLoading.set(true);

		return this.http.patch<ApiResponse<Mobo>>(`${this.apiUrl}/${id}`, updatedMobo, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data;
				this.mobos.update((list) => list.map((c) => (c._id === id ? updated : c)));

				this.selectedMobo.set(updated);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	delete(id: string): Observable<ApiResponse<Mobo>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<Mobo>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.mobos.update((list) => list.filter((c) => c._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

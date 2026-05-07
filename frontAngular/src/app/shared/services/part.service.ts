import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { Part } from '../models/part.model';

@Injectable({ providedIn: 'root' })
export class PartService {
	private http = inject(HttpClient);
	private apiUrl = `${environment.apiUrl}/categories`;

	parts = signal<Part[]>([]);
	selectedPart = signal<Part | null>(null);
	isLoading = signal(false);
	private hasLoaded = false;

	constructor() {
		this.getAll();
	}

	getAll() {
		if (this.hasLoaded) return;
		this.isLoading.set(true);

		this.http.get<ApiResponse<Part[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.parts.set(res.data);
				this.isLoading.set(false);
				this.hasLoaded = true;
			},
			error: (err) => {
				this.isLoading.set(false);
				console.log('Error cargando las categorías de componentes', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<Part>> {
		const cachedPart = this.parts().find((p) => p._id === id);
		if (cachedPart) this.selectedPart.set(cachedPart);
		else this.selectedPart.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<Part>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedPart.set(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newPart: Part): Observable<ApiResponse<Part>> {
		this.isLoading.set(true);

		return this.http.post<ApiResponse<Part>>(this.apiUrl, newPart, { withCredentials: true }).pipe(
			tap((res) => {
				this.parts.update((p) => [...p, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedPart: Partial<Part>): Observable<ApiResponse<Part>> {
		this.isLoading.set(true);

		return this.http.patch<ApiResponse<Part>>(`${this.apiUrl}/${id}`, updatedPart, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data;
				this.parts.update((list) => list.map((p) => (p._id === id ? updated : p)));

				this.selectedPart.set(updated);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	delete(id: string): Observable<ApiResponse<Part>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<Part>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap((res) => {
				this.parts.update((list) => list.filter((p) => p._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

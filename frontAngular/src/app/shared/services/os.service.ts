import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { Os } from '../models/os.model';
import { PartService } from './part.service';

@Injectable({ providedIn: 'root' })
export class OsService {
	private http = inject(HttpClient);
	private apiUrl = `${environment.apiUrl}/os`;
	private partService = inject(PartService);

	oss = signal<Os[]>([]);
	selectedOs = signal<Os | null>(null);
	isLoading = signal(false);
	partType = computed(() => this.partService.parts().find((p) => p.slug === 'os'));

	getAll() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Os[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.oss.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener OSs:', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<Os>> {
		const cachedOs = this.oss().find((o) => o._id === id);
		if (cachedOs) this.selectedOs.set(cachedOs);
		else this.selectedOs.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<Os>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedOs.set(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newOs: Os): Observable<ApiResponse<Os>> {
		this.isLoading.set(true);

		const idPart = this.partType()?._id;

		if (!idPart) {
			console.error('Error: No se ha encontrado el ID de la categoria "os"');
			return throwError(() => new Error('Categoría no inicializada'));
		}

		const osWithType = {
			...newOs,
			partType: idPart,
		};

		return this.http.post<ApiResponse<Os>>(this.apiUrl, osWithType, { withCredentials: true }).pipe(
			tap((res) => {
				this.oss.update((c) => [...c, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedOs: Partial<Os>): Observable<ApiResponse<Os>> {
		this.isLoading.set(true);

		return this.http.patch<ApiResponse<Os>>(`${this.apiUrl}/${id}`, updatedOs, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data;
				this.oss.update((list) => list.map((c) => (c._id === id ? updated : c)));

				this.selectedOs.set(updated);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	delete(id: string): Observable<ApiResponse<Os>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<Os>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.oss.update((list) => list.filter((c) => c._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

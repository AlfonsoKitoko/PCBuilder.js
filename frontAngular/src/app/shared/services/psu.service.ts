import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { Psu } from '../models/psu.model';
import { PartService } from './part.service';

@Injectable({ providedIn: 'root' })
export class PsuService {
	private http = inject(HttpClient);
	private apiUrl = `${environment.apiUrl}/psu`;
	private partService = inject(PartService);

	psus = signal<Psu[]>([]);
	selectedPsu = signal<Psu | null>(null);
	isLoading = signal(false);
	partType = computed(() => this.partService.parts().find((p) => p.slug === 'psu'));

	getAll() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Psu[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.psus.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener PSUs:', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<Psu>> {
		const cachedPsu = this.psus().find((p) => p._id === id);
		if (cachedPsu) this.selectedPsu.set(cachedPsu);
		else this.selectedPsu.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<Psu>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedPsu.set(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newPsu: Psu): Observable<ApiResponse<Psu>> {
		this.isLoading.set(true);

		const idPart = this.partType()?._id;

		if (!idPart) {
			console.error('Error: No se ha encontrado el ID de la categoria "psu"');
			return throwError(() => new Error('Categoría no inicializada'));
		}

		const psuWithType = {
			...newPsu,
			partType: idPart,
		};

		return this.http.post<ApiResponse<Psu>>(this.apiUrl, psuWithType, { withCredentials: true }).pipe(
			tap((res) => {
				this.psus.update((c) => [...c, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedPsu: Partial<Psu>): Observable<ApiResponse<Psu>> {
		this.isLoading.set(true);

		return this.http.patch<ApiResponse<Psu>>(`${this.apiUrl}/${id}`, updatedPsu, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data;
				this.psus.update((list) => list.map((c) => (c._id === id ? updated : c)));

				this.selectedPsu.set(updated);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	delete(id: string): Observable<ApiResponse<Psu>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<Psu>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.psus.update((list) => list.filter((c) => c._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

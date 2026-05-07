import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { Storage } from '../models/storage.model';
import { PartService } from './part.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
	private http = inject(HttpClient);
	private apiUrl = `${environment.apiUrl}/storage`;
	private partService = inject(PartService);

	storages = signal<Storage[]>([]);
	selectedStorage = signal<Storage | null>(null);
	isLoading = signal(false);
	partType = computed(() => this.partService.parts().find((p) => p.slug === 'storage'));

	getAll() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Storage[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.storages.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener STORAGEs:', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<Storage>> {
		const cachedStorage = this.storages().find((s) => s._id === id);
		if (cachedStorage) this.selectedStorage.set(cachedStorage);
		else this.selectedStorage.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<Storage>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedStorage.set(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newStorage: Storage): Observable<ApiResponse<Storage>> {
		this.isLoading.set(true);

		const idPart = this.partType()?._id;

		if (!idPart) {
			console.error('Error: No se ha encontrado el ID de la categoria "storage"');
			return throwError(() => new Error('Categoría no inicializada'));
		}

		const storageWithType = {
			...newStorage,
			partType: idPart,
		};

		return this.http.post<ApiResponse<Storage>>(this.apiUrl, storageWithType, { withCredentials: true }).pipe(
			tap((res) => {
				this.storages.update((c) => [...c, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedStorage: Partial<Storage>): Observable<ApiResponse<Storage>> {
		this.isLoading.set(true);

		return this.http
			.patch<ApiResponse<Storage>>(`${this.apiUrl}/${id}`, updatedStorage, { withCredentials: true })
			.pipe(
				tap((res) => {
					const updated = res.data;
					this.storages.update((list) => list.map((c) => (c._id === id ? updated : c)));

					this.selectedStorage.set(updated);
					this.isLoading.set(false);
				}),
				catchError((err) => {
					this.isLoading.set(false);
					return throwError(() => err);
				}),
			);
	}

	delete(id: string): Observable<ApiResponse<Storage>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<Storage>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.storages.update((list) => list.filter((c) => c._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

import { HttpClient } from "@angular/common/http"
import { inject, Injectable, signal } from "@angular/core"
import { environment } from "../../../environments/environment.development"
import { catchError, Observable, tap, throwError } from "rxjs"
import { ApiResponse } from "../models/api-response.model"
import { Gpu } from "../models/gpu.model"

@Injectable({ providedIn: 'root' })
export class GpuService {
	private http = inject(HttpClient)
	private apiUrl = `${environment.apiUrl}/gpu`

	gpus = signal<Gpu[]>([])
	selectedGpu = signal<Gpu | null>(null)
	isLoading = signal(false)

	getAll() {
		this.isLoading.set(true)

		this.http.get<ApiResponse<Gpu[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.gpus.set(res.data)
				this.isLoading.set(false)
			},
			error: (err) => {
				this.isLoading.set(false)
				console.error('Error al obtener CPUs:', err)
			}
		})
	}

	getById(id: string): Observable<ApiResponse<Gpu>> {
		const cachedGpu = this.gpus().find((g) => g._id === id)
		if(cachedGpu) this.selectedGpu.set(cachedGpu)
		else this.selectedGpu.set(null)

		this.isLoading.set(true)

		return this.http.get<ApiResponse<Gpu>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedGpu.set(res.data)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	create(newGpu: Gpu): Observable<ApiResponse<Gpu>> {
		this.isLoading.set(true)

		return this.http.post<ApiResponse<Gpu>>(this.apiUrl, newGpu, { withCredentials: true }).pipe(
			tap((res) => {
				this.gpus.update((c) => [...c, res.data])
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	update(id: string, updatedGpu: Partial<Gpu>): Observable<ApiResponse<Gpu>> {
		this.isLoading.set(true)

		return this.http.patch<ApiResponse<Gpu>>(`${this.apiUrl}/${id}`, updatedGpu, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data
				this.gpus.update((list) => list.map((c) => (c._id === id ? updated : c)))

				this.selectedGpu.set(updated)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	delete(id: string): Observable<ApiResponse<Gpu>> {
		this.isLoading.set(true)

		return this.http.delete<ApiResponse<Gpu>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.gpus.update((list) => list.filter((c) => c._id !== id))
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}
}

import { HttpClient } from "@angular/common/http"
import { inject, Injectable, signal } from "@angular/core"
import { environment } from "../../../environments/environment.development"
import { catchError, Observable, tap, throwError } from "rxjs"
import { ApiResponse } from "../models/api-response.model"
import { Os } from "../models/os.model"

@Injectable({ providedIn: 'root' })
export class OsService {
	private http = inject(HttpClient)
	private apiUrl = `${environment.apiUrl}/os`

	oss = signal<Os[]>([])
	selectedOs = signal<Os | null>(null)
	isLoading = signal(false)

	getAll() {
		this.isLoading.set(true)

		this.http.get<ApiResponse<Os[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.oss.set(res.data)
				this.isLoading.set(false)
			},
			error: (err) => {
				this.isLoading.set(false)
				console.error('Error al obtener CPUs:', err)
			}
		})
	}

	getById(id: string): Observable<ApiResponse<Os>> {
		const cachedOs = this.oss().find((o) => o._id === id)
		if(cachedOs) this.selectedOs.set(cachedOs)
		else this.selectedOs.set(null)

		this.isLoading.set(true)

		return this.http.get<ApiResponse<Os>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedOs.set(res.data)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	create(newOs: Os): Observable<ApiResponse<Os>> {
		this.isLoading.set(true)

		return this.http.post<ApiResponse<Os>>(this.apiUrl, newOs, { withCredentials: true }).pipe(
			tap((res) => {
				this.oss.update((c) => [...c, res.data])
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	update(id: string, updatedOs: Partial<Os>): Observable<ApiResponse<Os>> {
		this.isLoading.set(true)

		return this.http.patch<ApiResponse<Os>>(`${this.apiUrl}/${id}`, updatedOs, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data
				this.oss.update((list) => list.map((c) => (c._id === id ? updated : c)))

				this.selectedOs.set(updated)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	delete(id: string): Observable<ApiResponse<Os>> {
		this.isLoading.set(true)

		return this.http.delete<ApiResponse<Os>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.oss.update((list) => list.filter((c) => c._id !== id))
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}
}

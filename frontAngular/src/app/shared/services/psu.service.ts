import { HttpClient } from "@angular/common/http"
import { inject, Injectable, signal } from "@angular/core"
import { environment } from "../../../environments/environment.development"
import { catchError, Observable, tap, throwError } from "rxjs"
import { ApiResponse } from "../models/api-response.model"
import { Psu } from "../models/psu.model"

@Injectable({ providedIn: 'root' })
export class PsuService {
	private http = inject(HttpClient)
	private apiUrl = `${environment.apiUrl}/psu`

	psus = signal<Psu[]>([])
	selectedPsu = signal<Psu | null>(null)
	isLoading = signal(false)

	getAll() {
		this.isLoading.set(true)

		this.http.get<ApiResponse<Psu[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.psus.set(res.data)
				this.isLoading.set(false)
			},
			error: (err) => {
				this.isLoading.set(false)
				console.error('Error al obtener CPUs:', err)
			}
		})
	}

	getById(id: string): Observable<ApiResponse<Psu>> {
		const cachedPsu = this.psus().find((p) => p._id === id)
		if(cachedPsu) this.selectedPsu.set(cachedPsu)
		else this.selectedPsu.set(null)

		this.isLoading.set(true)

		return this.http.get<ApiResponse<Psu>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedPsu.set(res.data)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	create(newPsu: Psu): Observable<ApiResponse<Psu>> {
		this.isLoading.set(true)

		return this.http.post<ApiResponse<Psu>>(this.apiUrl, newPsu, { withCredentials: true }).pipe(
			tap((res) => {
				this.psus.update((c) => [...c, res.data])
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	update(id: string, updatedPsu: Partial<Psu>): Observable<ApiResponse<Psu>> {
		this.isLoading.set(true)

		return this.http.patch<ApiResponse<Psu>>(`${this.apiUrl}/${id}`, updatedPsu, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data
				this.psus.update((list) => list.map((c) => (c._id === id ? updated : c)))

				this.selectedPsu.set(updated)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	delete(id: string): Observable<ApiResponse<Psu>> {
		this.isLoading.set(true)

		return this.http.delete<ApiResponse<Psu>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.psus.update((list) => list.filter((c) => c._id !== id))
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}
}

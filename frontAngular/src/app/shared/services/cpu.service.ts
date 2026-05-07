import { HttpClient } from "@angular/common/http"
import { inject, Injectable, signal } from "@angular/core"
import { environment } from "../../../environments/environment.development"
import { catchError, Observable, tap, throwError } from "rxjs"
import { ApiResponse } from "../models/api-response.model"
import { Cpu } from "../models/cpu.model"

@Injectable({ providedIn: 'root' })
export class CpuService {
	private http = inject(HttpClient)
	private apiUrl = `${environment.apiUrl}/cpu`

	cpus = signal<Cpu[]>([])
	selectedCpu = signal<Cpu | null>(null)
	isLoading = signal(false)

	getAll() {
		this.isLoading.set(true)

		this.http.get<ApiResponse<Cpu[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.cpus.set(res.data)
				this.isLoading.set(false)
			},
			error: (err) => {
				this.isLoading.set(false)
				console.error('Error al obtener CPUs:', err)
			}
		})
	}

	getById(id: string): Observable<ApiResponse<Cpu>> {
		const cachedCpu = this.cpus().find((c) => c._id === id)
		if(cachedCpu) this.selectedCpu.set(cachedCpu)
		else this.selectedCpu.set(null)

		this.isLoading.set(true)

		return this.http.get<ApiResponse<Cpu>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedCpu.set(res.data)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	create(newCpu: Cpu): Observable<ApiResponse<Cpu>> {
		this.isLoading.set(true)

		return this.http.post<ApiResponse<Cpu>>(this.apiUrl, newCpu, { withCredentials: true }).pipe(
			tap((res) => {
				this.cpus.update((c) => [...c, res.data])
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	update(id: string, updatedCpu: Partial<Cpu>): Observable<ApiResponse<Cpu>> {
		this.isLoading.set(true)

		return this.http.patch<ApiResponse<Cpu>>(`${this.apiUrl}/${id}`, updatedCpu, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data
				this.cpus.update((list) => list.map((c) => (c._id === id ? updated : c)))

				this.selectedCpu.set(updated)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	delete(id: string): Observable<ApiResponse<Cpu>> {
		this.isLoading.set(true)

		return this.http.delete<ApiResponse<Cpu>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.cpus.update((list) => list.filter((c) => c._id !== id))
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}
}

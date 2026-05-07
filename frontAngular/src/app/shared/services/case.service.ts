import { HttpClient } from "@angular/common/http"
import { computed, inject, Injectable, signal } from "@angular/core"
import { environment } from "../../../environments/environment.development"
import { catchError, Observable, tap, throwError } from "rxjs"
import { ApiResponse } from "../models/api-response.model"
import { Case } from "../models/case.model"
import { PartService } from "./part.service"

@Injectable({ providedIn: 'root' })
export class CaseService {
	private http = inject(HttpClient)
	private partService = inject(PartService)
	private apiUrl = `${environment.apiUrl}/case`

	cases = signal<Case[]>([])
	selectedCase = signal<Case | null>(null)
	isLoading = signal(false)
	partType = computed(()=>
		this.partService.parts().find(p=>p.slug==='case')
)

	getAll() {
		this.isLoading.set(true)

		this.http.get<ApiResponse<Case[]>>(this.apiUrl).subscribe({
			next: (res) => {
				this.cases.set(res.data)
				this.isLoading.set(false)
			},
			error: (err) => {
				this.isLoading.set(false)
				console.error('Error al obtener Cajas:', err)
			}
		})
	}

	getById(id: String): Observable<ApiResponse<Case>> {
		const cachedCase = this.cases().find((c) => c._id === id)
		if(cachedCase) this.selectedCase.set(cachedCase)
		else this.selectedCase.set(null)

		this.isLoading.set(true)

		return this.http.get<ApiResponse<Case>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedCase.set(res.data)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	create(newCase: Case): Observable<ApiResponse<Case>> {
		this.isLoading.set(true)

		const idPart = this.partType()?._id

		if(!idPart){
			console.error('Error: No se ha encontrado el ID de la categoria "case"')
			return throwError(()=>new Error('Categoría no inicializada'))
		}

		const caseWithType={
			...newCase,
			partType:idPart
		}

		return this.http.post<ApiResponse<Case>>(this.apiUrl, caseWithType, { withCredentials: true }).pipe(
			tap((res) => {
				this.cases.update((c) => [...c, res.data])
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	update(id: string, updatedCase: Partial<Case>): Observable<ApiResponse<Case>> {
		this.isLoading.set(true)

		return this.http.patch<ApiResponse<Case>>(`${this.apiUrl}/${id}`, updatedCase, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data
				this.cases.update((list) => list.map((c) => (c._id === id ? updated : c)))

				this.selectedCase.set(updated)
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}

	delete(id: string): Observable<ApiResponse<Case>> {
		this.isLoading.set(true)

		return this.http.delete<ApiResponse<Case>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.cases.update((list) => list.filter((c) => c._id !== id))
				this.isLoading.set(false)
			}),
			catchError((err) => {
				this.isLoading.set(false)
				return throwError(() => err)
			})
		)
	}
}

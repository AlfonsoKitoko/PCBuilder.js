import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../models/api-response.model';
import { BuildState } from '../models/build-state.model';
import { Build, WattageDetails } from '../models/build.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BuildService {
	private http = inject(HttpClient);
	private authService = inject(AuthService);
	private apiUrl = `${environment.apiUrl}/builds`;

	builds = signal<Build[]>([]);
	selectedBuild = signal<Build | null>(null);
	isLoading = signal(false);

	editIndex: number | undefined = undefined;

	currentBuild = signal<BuildState & { name?: string; description?: string }>({
		_id: undefined,
		name: '',
		description: '',
		cpu: null,
		mobo: null,
		gpu: null,
		ram: [],
		storage: [],
		psu: null,
		case: null,
		os: null,
	});

	analysis = signal<{
		errors: string[];
		warnings: string[];
		wattage: WattageDetails | null;
		totalPrice: number;
		isValid: boolean;
	}>({
		errors: [],
		warnings: [],
		wattage: null,
		totalPrice: 0,
		isValid: false,
	});

	updateMetadata(name: string, description: string) {
		this.currentBuild.update((state) => ({ ...state, name, description }));
	}

	checkCompatibility() {
		const b = this.currentBuild();
		if (!b.cpu && !b.mobo && b.ram.length === 0) {
			this.analysis.set({ errors: [], warnings: [], wattage: null, totalPrice: 0, isValid: false });
			return;
		}

		if (!this.authService.user()) {
			// 1. Inicializamos los detalles del consumo calcados de tu power.engine
			const wattage = {
				cpu: b.cpu?.tdp || 0,
				gpu: b.gpu?.tdp || 0,
				mobo: b.mobo ? 50 : 0, // Margen placa/ventiladores si hay placa seleccionada
				ram: 0,
				storage: 0,
				total: 0,
			};

			// 2. Cálculo exacto de la Memoria RAM
			if (b.ram) {
				b.ram.forEach((kit) => {
					const sticks = kit.modules?.reduce((acc: number, m: any) => acc + (m.quantity || 0), 0) || 1;
					const v = (kit.voltage || 0) / 100;
					const watts = (Math.round(v * 3) || 4) * sticks;
					wattage.ram += watts;
				});
			}

			// 3. Cálculo exacto del Almacenamiento (Diferenciando NVMe vs SATA vs RPMs)
			if (b.storage) {
				b.storage.forEach((s) => {
					const type = s.type || '';
					let watts = 0;

					if (type === 'SSD') watts = s.nvme ? 5 : 3;
					else if (type.includes('HDD 10000') || type.includes('15000')) watts = 12;
					else if (type.includes('HDD 7200')) watts = 9;
					else if (type.includes('HDD')) watts = 6;
					else watts = 5;

					wattage.storage += watts;
				});
			}

			// 4. Sumamos el total idéntico a tu motor
			wattage.total = wattage.cpu + wattage.gpu + wattage.mobo + wattage.ram + wattage.storage;

			// 5. Validamos las alertas de la fuente de alimentación de forma local (checkPSUPower)
			const errors: string[] = [];
			const warnings: string[] = [];

			if (b.psu) {
				const safetyMargin = 1.2;
				if (b.psu.wattage < wattage.total) {
					errors.push(
						`Critical PSU Error: Total consumption is ${wattage.total} W, but PSU only provides ${b.psu.wattage} W.`,
					);
				} else if (b.psu.wattage < Math.ceil(wattage.total * safetyMargin)) {
					warnings.push(`PSU Warning: Power is tight. Recommended: ${Math.ceil(wattage.total * safetyMargin)} W.`);
				}
			}

			// 6. Calculamos el precio total acumulado en caliente en la interfaz
			const calculatedPrice =
				(b.cpu?.price || 0) +
				(b.mobo?.price || 0) +
				(b.gpu?.price || 0) +
				(b.psu?.price || 0) +
				(b.case?.price || 0) +
				(b.os?.price || 0) +
				(b.ram?.reduce((acc, r) => acc + (r.price || 0), 0) || 0) +
				(b.storage?.reduce((acc, s) => acc + (s.price || 0), 0) || 0);

			this.analysis.set({
				errors,
				warnings,
				wattage,
				totalPrice: calculatedPrice,
				isValid: errors.length === 0,
			});
			return;
		}

		const payload = {
			cpu: b.cpu?._id,
			mobo: b.mobo?._id,
			ram: b.ram.map((r) => r._id),
			storage: b.storage.map((s) => s._id),
			gpu: b.gpu?._id,
			case: b.case?._id,
			psu: b.psu?._id,
		};

		this.http.post<ApiResponse<any>>(`${this.apiUrl}/validate`, payload, { withCredentials: true }).subscribe({
			next: (res) => {
				this.analysis.set({
					errors: res.data.errors || [],
					warnings: res.data.warnings || [],
					wattage: res.data.wattage || null,
					totalPrice: res.data.totalPrice || 0,
					isValid: res.data.isValid ?? false,
				});
			},
			error: (err) => console.error('Error en el Build Engine:', err),
		});
	}

	readonly localWattage = computed(() => this.analysis()?.wattage?.total);
	readonly currentPrice = computed(() => this.analysis()?.totalPrice);

	addPart(type: keyof BuildState, part: any) {
		this.currentBuild.update((state) => {
			const currentValue = state[type];

			if (Array.isArray(currentValue)) {
				if (this.editIndex !== undefined) {
					const updatedArray = [...currentValue];
					updatedArray[this.editIndex] = part;

					this.editIndex = undefined;

					return {
						...state,
						[type]: updatedArray,
					};
				}

				return {
					...state,
					[type]: [...currentValue, part],
				};
			}

			return {
				...state,
				[type]: part,
			};
		});
		this.checkCompatibility();
	}

	removePart(type: keyof BuildState, index?: number) {
		this.currentBuild.update((state) => {
			const val = state[type];

			if (Array.isArray(val) && index !== undefined) {
				return { ...state, [type]: val.filter((_, i) => i !== index) };
			}
			return { ...state, [type]: Array.isArray(val) ? [] : null };
		});
		this.checkCompatibility();
	}

	resetBuild() {
		this.currentBuild.set({
			_id: undefined,
			name: '',
			description: '',
			cpu: null,
			mobo: null,
			ram: [],
			storage: [],
			gpu: null,
			case: null,
			psu: null,
			os: null,
		});
		this.analysis.set({ errors: [], warnings: [], wattage: null, totalPrice: 0, isValid: false });
	}

	setEditBuild(build: Build) {
		this.currentBuild.set({
			_id: build._id, // Aquí recuperamos el ID de MongoDB
			name: build.name,
			description: build.description || '',
			cpu: build.cpu,
			mobo: build.mobo,
			gpu: build.gpu || null,
			ram: [...(build.ram || [])],
			storage: [...(build.storage || [])],
			psu: build.psu,
			case: build.case,
			os: build.os || null,
		});
		this.checkCompatibility();
	}

	getAll() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Build[]>>(this.apiUrl).subscribe({
			next: (res) => {
				console.log(res);
				this.builds.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener BUILDs:', err);
			},
		});
	}

	getMine() {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Build[]>>(`${this.apiUrl}/mine`, { withCredentials: true }).subscribe({
			next: (res) => {
				this.builds.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener tus builds: ', err);
			},
		});
	}

	getUserBuilds(userId: string) {
		this.isLoading.set(true);

		this.http.get<ApiResponse<Build[]>>(`${this.apiUrl}/user/${userId}`, { withCredentials: true }).subscribe({
			next: (res) => {
				this.builds.set(res.data);
				this.isLoading.set(false);
			},
			error: (err) => {
				this.isLoading.set(false);
				console.error('Error al obtener las builds del usuario:', err);
			},
		});
	}

	getById(id: string): Observable<ApiResponse<Build>> {
		const cachedBuild = this.builds().find((b) => b._id === id);
		if (cachedBuild) {
			this.selectedBuild.set(cachedBuild);
			this.setEditBuild(cachedBuild);
		} else this.selectedBuild.set(null);

		this.isLoading.set(true);

		return this.http.get<ApiResponse<Build>>(`${this.apiUrl}/${id}`).pipe(
			tap((res) => {
				this.selectedBuild.set(res.data);
				this.setEditBuild(res.data);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	create(newBuild: Build): Observable<ApiResponse<Build>> {
		this.isLoading.set(true);

		return this.http.post<ApiResponse<Build>>(this.apiUrl, newBuild, { withCredentials: true }).pipe(
			tap((res) => {
				this.builds.update((c) => [...c, res.data]);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	update(id: string, updatedBuild: Partial<Build>): Observable<ApiResponse<Build>> {
		this.isLoading.set(true);

		return this.http.patch<ApiResponse<Build>>(`${this.apiUrl}/${id}`, updatedBuild, { withCredentials: true }).pipe(
			tap((res) => {
				const updated = res.data;
				this.builds.update((list) => list.map((c) => (c._id === id ? updated : c)));

				this.selectedBuild.set(updated);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	delete(id: string): Observable<ApiResponse<Build>> {
		this.isLoading.set(true);

		return this.http.delete<ApiResponse<Build>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
			tap(() => {
				this.builds.update((list) => list.filter((c) => c._id !== id));
				this.isLoading.set(false);
			}),
			catchError((err) => {
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}
}

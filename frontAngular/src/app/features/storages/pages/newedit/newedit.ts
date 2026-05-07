import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common'
import { Component, computed, inject, input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { StorageService } from '../../../../shared/services/storage.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { storageType, storageFormFactor, storageInterface } from '../../../../shared/constants/index.constant'
import { userProfile } from '../../../../shared/models/user.model' //
import { getImageUrl } from '../../../../shared/utils/image-mapper'

@Component({
	selector: 'app-newedit',
	imports: [CommonModule, ReactiveFormsModule, RouterModule, CurrencyPipe, DecimalPipe],
	templateUrl: './newedit.html',
})
export default class NewEdit implements OnInit {
	id = input<string>()
	slug = input<string>()

	private readonly fb = inject(FormBuilder)
	private readonly storageService = inject(StorageService)
	private readonly authService = inject(AuthService)
	private readonly router = inject(Router)
	private readonly toast = inject(ToastService)

	readonly getImageUrl = getImageUrl

	isLoading = this.storageService.isLoading
	isEditMode = computed(() => !!this.id())
	selectedStorage = this.storageService.selectedStorage

	// Configuración de roles permitidos (igual que en tu archivo de Builds)
	managementRoles = [userProfile.ADMIN] //

	storageTypes = Object.values(storageType)
	storageFormFactors = Object.values(storageFormFactor)
	storageInterfaces = Object.values(storageInterface)

	form: FormGroup = this.fb.group({
		manufacturer: [, [Validators.required]],
		model: [, [Validators.required]],
		capacity: [, [Validators.required]],
		type: [, [Validators.required]],
		form_factor: [, [Validators.required]],
		interface: [, [Validators.required]],
		cache: [, [Validators.required]],
		nvme: [, [Validators.required]],
		price: [, [Validators.required, Validators.min(0)]],
	})

	// Propiedad computada para verificar el permiso de forma reactiva
	canManage = computed(() => {
		const user = this.authService.user();
		return user && this.managementRoles.includes(user.profile as userProfile);
	})

	ngOnInit() {
		if (!this.canManage()) {
			this.toast.show('No tienes permisos para gestionar storage', 'error');
			this.router.navigate(['/storage/all']);
			return;
		}

		if (this.isEditMode()) {
			this.storageService.selectedStorage.set(null);
			this.storageService.getById(this.id()!).subscribe({
				next: (res) => {
					// Transformamos para que el usuario vea GHz y Euros
					console.log(this.selectedStorage());
					const data = {
						...res.data,
						price: res.data.price / 100, // Céntimos -> Euros
					};
					this.form.patchValue(data);
				},
				error: () => {
					this.toast.show('Error al buscar la Disco Duro (Storage)', 'error');
					this.router.navigate(['/storage/all']);
				}
			});
		}
	}

	onSubmit() {
		if (this.form.invalid || !this.canManage()) {
			this.form.markAllAsTouched();
			return;
		}

		this.isLoading.set(true);

		// Transformamos de vuelta para MongoDB (Euros -> Céntimos, L -> cL)
		const rawValue = this.form.getRawValue();
		const data = {
			...rawValue,
			price: Math.round(rawValue.price * 100),
		};

		const request = this.isEditMode()
			? this.storageService.update(this.id()!, data)
			: this.storageService.create(data);

		request.subscribe({
			next: () => {
				const msg = this.isEditMode() ? 'Cambios guardados' : 'Disco Duro (Storage) creada correctamente';
				this.toast.show(msg, 'success');
				this.router.navigate(['/storage/all']);
			},
			error: (err) => {
				this.isLoading.set(false);
				this.toast.show(err.error?.message || 'Error en la operación', 'error');
			}
		});
	}
}

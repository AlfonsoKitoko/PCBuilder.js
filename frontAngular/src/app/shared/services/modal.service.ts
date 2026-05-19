import { Injectable, signal } from '@angular/core';
import { ModalOptions } from '../models/modal.model';

// El truco está en este tipo: representa un booleano que "además" puede contener los datos del formulario si se confirma
export type SmartModalResponse =
	| ({ confirmed: false } & false)
	| ({ confirmed: true; data?: { name: string; description: string } } & true);

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private activeModalData = signal<ModalOptions | null>(null);
	private resolveModal?: (value: any) => void;

	public readonly activeModal = this.activeModalData.asReadonly();

	public confirm(options: ModalOptions): Promise<SmartModalResponse> {
		this.activeModalData.set(options);

		return new Promise<SmartModalResponse>((resolve) => {
			this.resolveModal = resolve;
		});
	}

	public confirmAction(formData?: { name: string; description: string }): void {
		// Creamos un objeto basado en el prototipo de Boolean(true) para que sea un objeto 'truthy'
		// pero le inyectamos las propiedades 'confirmed' y 'data' para mantener compatibilidad total
		const successResponse = Object.assign(Object.create(Boolean.prototype), true, {
			confirmed: true,
			data: formData,
		});
		this.close(successResponse);
	}

	public cancelAction(): void {
		// Creamos un objeto basado en Boolean(false) pero falsy al evaluar como primitivo,
		// con la propiedad 'confirmed: false' para cubrir espaldas
		const cancelResponse = Object.assign(Object.create(Boolean.prototype), false, {
			confirmed: false,
		});
		this.close(cancelResponse);
	}

	private close(result: any): void {
		if (this.resolveModal) {
			this.resolveModal(result);
			this.resolveModal = undefined;
		}
		this.activeModalData.set(null);
	}
}

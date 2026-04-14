import { Injectable, signal } from "@angular/core"
import { Subject } from "rxjs"
import { ModalOptions } from "../models/modal.model"

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private modalResult = new Subject<boolean>()
	private activeModalData = signal<ModalOptions | null>(null)

	// El modal es de sólo lectura
	public readonly activeModal = this.activeModalData.asReadonly()

	// Abre un modal de confirmación y devuelve una promesa que se resuelve con la elección del usuario
	public async confirm(options: ModalOptions): Promise<boolean> {
		this.activeModalData.set(options)

		return new Promise<boolean>((resolve) => {
			const subscription = this.modalResult.subscribe((result) => {
				subscription.unsubscribe()
				this.activeModalData.set(null)
				resolve(result)
			})
		})
	}

	// Si el usuario confirma
	public confirmAction(): void { this.modalResult.next(true) }

	// Si el usuario cancela
	public cancelAction(): void { this.modalResult.next(false) }

}

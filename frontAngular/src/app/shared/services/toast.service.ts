import { Injectable, signal } from "@angular/core"
import { Toast, ToastType } from "../models/toast.model"

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts = signal<Toast[]>([])

	show(message: string, type: ToastType = 'info', duration: number = 3000) {
		const id = Date.now() + Math.random()
		this.toasts.update((t) => [...t, { id, message, type }])

		setTimeout(() => this.remove(id), duration)
	}

	remove(id: number) {
		this.toasts.update((t) => t.filter(toast => toast.id !== id))
	}
}

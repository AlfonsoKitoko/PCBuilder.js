export interface ModalOptions {
	title: string
	message: string
	confirmLabel?: string
	cancelLabel?: string
	type?: 'confirm' | 'danger' | 'info'
}

export interface ModalResult { confirmed: boolean }

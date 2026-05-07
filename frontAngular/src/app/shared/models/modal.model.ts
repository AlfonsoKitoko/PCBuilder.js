export interface ModalOptions {
	title: string
	message: string
	confirmLabel?: string
	cancelLabel?: string
	type?: ModalType
}

export type ModalType = 'confirm' | 'danger' | 'info'

export interface ModalResult { confirmed: boolean }

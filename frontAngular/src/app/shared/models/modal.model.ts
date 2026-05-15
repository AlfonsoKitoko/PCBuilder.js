export interface ModalOptions {
	title: string;
	message: string;
	confirmLabel?: string;
	cancelLabel?: string;
	type?: ModalType;
	initialData?: { name: string; description: string };
}

export type ModalType = 'confirm' | 'danger' | 'info' | 'build';

export interface ModalResponse {
	confirmed: boolean;
	data?: { name: string; description: string };
}

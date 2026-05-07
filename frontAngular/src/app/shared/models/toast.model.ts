export interface Toast {
	message: string;
	type: ToastType;
	id: number;
}

export type ToastType = 'success' | 'error' | 'info';

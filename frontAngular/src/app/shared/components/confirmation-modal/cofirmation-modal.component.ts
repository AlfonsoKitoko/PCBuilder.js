import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ModalOptions } from '../../models/modal.model';

@Component({
	selector: 'app-confirmation-modal',
	imports: [CommonModule],
	templateUrl: './cofirmation-modal.component.html',
})
export class ConfirmationModalComponent {
	// Entrada de datos para el modal
	data = input.required<ModalOptions>();

	// Salidas para las acciones de confirmar y cancelar
	confirm = output<void>();
	cancel = output<void>();

	// Cierra el modal si se hace click fuera del mismo
	onBackdropClick(event: MouseEvent): void {
		if ((event.target as HTMLElement).classList.contains('modal-backdrop')) this.cancel.emit();
	}
}

import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalOptions } from '../../models/modal.model';
import { ModalService } from '../../services/modal.service';

@Component({
	selector: 'app-build-modal',
	imports: [CommonModule, FormsModule],
	templateUrl: './build-modal.html',
})
export class BuildModalComponent implements OnInit {
	private modalService = inject(ModalService);

	data = input.required<ModalOptions>();

	name = signal('');
	description = signal('');

	ngOnInit(): void {
		const initial = this.data().initialData;
		if (initial) {
			this.name.set(initial.name || '');
			this.description.set(initial.description || '');
		}
	}

	confirmSave() {
		if (this.name().trim()) {
			this.modalService.confirmAction({
				name: this.name(),
				description: this.description(),
			});
		}
	}
	cancel() {
		this.modalService.cancelAction();
	}

	onBackdropClick(event: MouseEvent): void {
		if ((event.target as HTMLElement).classList.contains('modal-backdrop')) this.cancel();
	}
}

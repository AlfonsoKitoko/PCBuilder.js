import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationModalComponent } from './shared/components/confirmation-modal/cofirmation-modal.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ToastComponent } from './shared/components/toast/toast';
import { ModalService } from './shared/services/modal.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, FooterComponent, ConfirmationModalComponent, ToastComponent],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	protected readonly title = signal('PCBUILDER');
	protected readonly modalService = inject(ModalService);
}

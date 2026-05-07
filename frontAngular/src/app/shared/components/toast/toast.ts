import { CommonModule } from "@angular/common"
import { Component, inject } from "@angular/core"
import { ToastService } from "../../services/toast.service"

@Component({
	selector: 'app-toast',
	imports: [CommonModule],
	templateUrl: './toast.html'
})
export class ToastComponent {
	toastService = inject(ToastService)
}

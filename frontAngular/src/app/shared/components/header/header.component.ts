import { CommonModule } from "@angular/common"
import { Component, inject } from "@angular/core"
import { NavbarComponent } from "../navbar/navbar.component"
import { AuthService } from "../../services/auth.service"

@Component({
	selector: 'app-header',
	imports: [CommonModule, NavbarComponent],
	templateUrl: './header.component.html'
})

export class HeaderComponent {
	private authService = inject(AuthService)

	user = this.authService.user
}

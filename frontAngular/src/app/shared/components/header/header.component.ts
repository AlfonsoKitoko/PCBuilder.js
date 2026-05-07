import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
	selector: 'app-header',
	imports: [CommonModule, NavbarComponent],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	private authService = inject(AuthService);

	user = this.authService.user;
}

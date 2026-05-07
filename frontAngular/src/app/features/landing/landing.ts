import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
	selector: 'app-landing',
	imports: [RouterLink],
	templateUrl: './landing.html',
})
export default class Landing {
	authService = inject(AuthService);
}

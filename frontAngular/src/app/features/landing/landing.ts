import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { BuildService } from '../../shared/services/build.service';
import { getBuildIdentity } from '../../shared/utils/brand-styles';

@Component({
	selector: 'app-landing',
	imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
	templateUrl: './landing.html',
})
export default class Landing implements OnInit {
	private readonly authService = inject(AuthService);
	public readonly buildService = inject(BuildService);
	readonly getBuildIdentity = getBuildIdentity;

	user = this.authService.user;

	categories = [
		{ name: 'Procesadores', slug: 'cpu' },
		{ name: 'Placas Base', slug: 'motherboard' },
		{ name: 'Memoria RAM', slug: 'ram' },
		{ name: 'Almacenamiento', slug: 'storage' },
		{ name: 'Tarjetas Gráficas', slug: 'gpu' },
		{ name: 'Fuentes de alimentación', slug: 'psu' },
		{ name: 'Cajas', slug: 'case' },
		{ name: 'Sistemas Operativos', slug: 'os' },
	];

	ngOnInit() {
		if (this.user()) {
			this.buildService.getMine();
		}
	}
}

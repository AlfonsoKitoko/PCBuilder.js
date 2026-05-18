import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userProfile } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { PartService } from '../../../../shared/services/part.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { getImageUrl } from '../../../../shared/utils/image-mapper';

interface CategoryMeta {
	title: string;
	description: string;
}

@Component({
	selector: 'app-parts',
	imports: [CommonModule, RouterModule],
	templateUrl: './parts.html',
})
export default class Parts {
	private readonly router = inject(Router);
	private readonly partService = inject(PartService);
	private readonly authService = inject(AuthService);
	private readonly modal = inject(ModalService);
	private readonly toast = inject(ToastService);

	readonly getImageUrl = getImageUrl;

	private readonly categoryMeta: Record<string, CategoryMeta> = {
		cpu: {
			title: 'Procesadores',
			description: 'Cálculo general, multitarea, renderizado y motor principal del sistema.',
		},
		motherboard: {
			title: 'Placas Base',
			description: '	Interconexión de componentes, soporte de sockets y expansión de hardware.',
		},
		ram: {
			title: 'Memorias RAM',
			description: '	Memoria de acceso rápido para juegos, carga de aplicaciones y fluidez general.',
		},
		storage: {
			title: 'Almacenamiento',
			description: '	Guardado seguro de archivos, instalación del sistema y tiempos de carga rápidos.',
		},
		gpu: {
			title: 'Tarjetas Gráficas',
			description: '	Rendimiento en juegos, edición de vídeo, modelado 3D e inteligencia artificial.',
		},
		case: {
			title: 'Cajas y Torres',
			description: '	Protección física de las piezas, organización interna y flujo de ventilación.',
		},
		psu: {
			title: 'Fuentes de Alimentación',
			description: '	Distribución de energía eléctrica estable, segura y eficiente a todo el equipo.',
		},
		os: {
			title: 'Sistemas Operativos',
			description: '	Interfaz de usuario, compatibilidad de software y gestión del ecosistema.',
		},
	};

	getCategoryMeta(slug: string): CategoryMeta {
		return (
			this.categoryMeta[slug.toLowerCase()] || {
				title: slug,
				description: 'Gestiona las categorías de componentes.',
			}
		);
	}

	parts = this.partService.parts;
	isLoading = this.partService.isLoading;

	user = computed(() => this.authService.user());
	managementRoles = [userProfile.ADMIN];

	ngOnInit() {
		this.partService.getAll();
	}
}

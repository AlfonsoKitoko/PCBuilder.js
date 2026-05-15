import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-build-wattage-details',
	standalone: true,
	imports: [CommonModule, DecimalPipe],
	templateUrl: 'build-wattage-details.html',
})
export class BuildWattageDetailsComponent {
	slots = input.required<any>();
	wattage = input<any>();
}

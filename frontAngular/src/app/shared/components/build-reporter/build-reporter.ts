import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-build-reporter',
	imports: [CommonModule],
	templateUrl: './build-reporter.html',
})
export class BuildReporterComponent {
	analysis = input.required<any>();
}

import { checkCompatibility } from './compatibility.engine.js'
import { checkPSUPower } from './power.engine.js'

export const validateFullBuild = (build) => {
	// 1. Obtenemos el reporte base (Socket, RAM Type, Form Factor, etc.)
	const report = checkCompatibility(build)

	// 2. Ejecutamos el motor de energía (PSU)
	const psuStatus = checkPSUPower(build)

	// 3. Clasificamos el resultado de la PSU
	if (psuStatus) {
		if (psuStatus.isCritical) {
			report.errors.push(psuStatus.message)
		} else {
			report.warnings.push(psuStatus.message)
		}
	}

	// --- CHIVATO BACKEND ---
	console.log('DEBUG BACKEND:', {
		errorsCount: report.errors.length,
		errors: report.errors,
		psu: psuStatus
	})

	return {
		isValid: report.errors.length === 0,
		errors: report.errors,
		warnings: report.warnings,
		totalWattage: psuStatus?.totalWattage || 0
	}
}
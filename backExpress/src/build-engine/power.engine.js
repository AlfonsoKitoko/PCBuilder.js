export const calcTotalPowerConsum = (build) => {
	let tdpTotal = 0

	if (build.cpu?.tdp) tdpTotal += build.cpu.tdp
	if (build.gpu?.tdp) tdpTotal += build.gpu.tdp

	// 5W por módulo físico
	if (build.ram) {
		build.ram.forEach(r => tdpTotal += (r.modules?.quantity || 1) * 5)
	}

	// Diferenciamos consumo NVMe vs SATA
	if (build.storage) {
		build.storage.forEach(s => tdpTotal += s.nvme ? 5 : 3)
	}

	tdpTotal += 50 // Margen placa/ventiladores
	return tdpTotal
}

export const checkPSUPower = (build) => {
	if (!build.psu) return null

	const powerTotal = calcTotalPowerConsum(build)
	const safetyMargin = 1.2 // 20% de margen recomendado

	// Caso 1: ERROR CRÍTICO (La fuente ni siquiera llega al consumo base)
	if (build.psu.wattage < powerTotal) {
		return {
			isCritical: true,
			message: `Critical PSU Error: Total consumption is ${powerTotal}W, but PSU only provides ${build.psu.wattage}W.`
		}
	}

	// Caso 2: WARNING (Funciona, pero por debajo del margen de seguridad del 20%)
	if (build.psu.wattage < Math.ceil(powerTotal * safetyMargin)) {
		return {
			isCritical: false,
			message: `PSU Warning: Power is tight. Recommended: ${Math.ceil(powerTotal * safetyMargin)}W.`
		}
	}

	return null
}
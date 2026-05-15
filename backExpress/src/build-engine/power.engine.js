export const calcTotalPowerConsum = (build) => {
	const details = {
		cpu: build.cpu?.tdp || 0,
		gpu: build.gpu?.tdp || 0,
		mobo: 50,	// Margen placa/ventiladores
		ram: 0,
		storage: 0,
		total: 0
	}

	// 5W por módulo físico
	if (build.ram) {
		build.ram.forEach(kit => {
			const sticks = kit.modules?.reduce((acc, m) => acc + (m.quantity || 0), 0) || 1
			const v = kit.voltage / 100
			const watts = (Math.round(v * 3) || 4) * sticks
			details.ram += watts
		})
	}

	// Diferenciamos consumo NVMe vs SATA
	if (build.storage) {
		build.storage.forEach(s => {
			const type = s.type || ''
			let watts = 0

			if (type === 'SSD') watts = s.nvme ? 5 : 3
			else if (type.includes('HDD 10000') || type.includes('15000')) watts = 12
			else if (type.includes('HDD 7200')) watts = 9
			else if (type.includes('HDD')) watts = 6
			else watts = 5

			details.storage += watts
		})
	}

	details.total = details.cpu + details.gpu + details.mobo + details.ram + details.storage
	return details
}

export const checkPSUPower = (build) => {
	const powerDetails = calcTotalPowerConsum(build)

	if (!build.psu) return { isCritical: false, message: 'No PSU selected', wattageDetails: powerDetails }
	const powerTotal = powerDetails.total
	const safetyMargin = 1.2 // 20% de margen recomendado

	let status = {
		isCritical: false,
		message: '',
		wattageDetails: powerDetails
	}

	// Caso 1: ERROR CRÍTICO (La fuente ni siquiera llega al consumo base)
	if (build.psu.wattage < powerTotal) {
		status.isCritical = true
		status.message = `Critical PSU Error: Total consumption is ${powerTotal} W, but PSU only provides ${build.psu.wattage} W.`
	}
	// Caso 2: WARNING (Funciona, pero por debajo del margen de seguridad del 20%)
	else if (build.psu.wattage < Math.ceil(powerTotal * safetyMargin)) {
		status.isCritical = false
		status.message = `PSU Warning: Power is tight. Recommended: ${Math.ceil(powerTotal * safetyMargin)} W.`
	} else return { ...status, message: 'PSU OK', isCritical: false }

	return status
}
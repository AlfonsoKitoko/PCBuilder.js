// Suma el wattage usando el tdp de cada componente 
export const calcTotalPowerConsum = (build) => {
	let tdpTotal = 0

	if (build.cpu?.tdp) tdpTotal += build.cpu.tdp
	if (build.gpu?.tdp) tdpTotal += build.gpu.tdp

	build.ram.forEach(r => tdpTotal += r.modules?.quantity * 5) // aprox. 5W por módulo
	build.storage.forEach(s => tdpTotal += s.nvme ? 5 : 3)

	// Margen para el resto de componentes (placa, ventiladores, etc.)
	tdpTotal += 50

	return tdpTotal
}

// Comprueba si el wattage total es mayor al 120% del wattage.
// Si el wattage de la fuente es menor, devuelve un mensaje de error indicando la potencia recomendada.
export const checkPSUPower = (build) => {
	if (!build.psu) return null

	const powerTotal = calcTotalPowerConsum(build)
	const recommendedPower = Math.ceil(powerTotal * 1.2)

	if (build.psu.wattage < recommendedPower) {
		return `Insufficient PSU: You have ${build.psu.wattage}W, but we recommend at least ${recommendedPower}W.`
	}

	return null
}
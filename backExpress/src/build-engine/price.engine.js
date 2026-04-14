export const calcTotalPrice = (build) => {
	let totalPriceCents = 0

	// 1. Componentes Únicos
	const singleParts = [
		build.cpu,
		build.mobo,
		build.gpu,
		build.case,
		build.psu,
		build.os
	]

	singleParts.forEach(part => {
		if (part?.price) totalPriceCents += part.price
	})

	// 2. Componentes Múltiples (Arrays)
	// Usamos el encadenamiento opcional ?. para evitar errores si el array no existe
	build.ram?.forEach(r => {
		if (r?.price) totalPriceCents += r.price
	})

	build.storage?.forEach(s => {
		if (s?.price) totalPriceCents += s.price
	})

	return totalPriceCents
}
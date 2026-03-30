export const calcTotalPrice = (build) => {
	let totalPriceCents = 0
	const parts = [
		build.cpu,
		build.mobo,
		build.ram,
		build.gpu,
		build.storage,
		build.case,
		build.psu
	]

	parts.forEach(part => {
		if (part?.price) totalPriceCents += part.price;
	})

	build.ram?.forEach(r => totalPriceCents += r.price)
	build.storage?.forEach(s => totalPriceCents += s.price)

	return totalPriceCents;
}
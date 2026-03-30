import { MOBO_FORM_FACTOR } from "../constants/index.constant.js"

export const checkCompatibility = (build) => {
	const errors = []

	if (!build) return errors

	const { cpu, mobo, ram, gpu, storage, case: pcCase, psu } = build

	// 1. Socket CPU vs Motherboard
	if (cpu && mobo && cpu.socket !== mobo.socket) {
		errors.push(`Incompatible Socket: CPU is ${cpu.socket} but Motherboard is ${mobo.socket}`)
	}

	// 2. RAM: Tipo y Cantidad de Módulos
	if (ram && ram.length > 0 && mobo) {
		// Comprobar que todos los módulos sean del mismo tipo que la placa
		const wrongType = ram.some(r => r.ram_type !== mobo.ram_type)
		if (wrongType) {
			errors.push(`RAM type mismatch: Motherboard requires ${mobo.ram_type}`)
		}

		// Comprobar slots físicos ocupados
		// (Ojo: si un objeto RAM representa un pack de 2, deberías sumar r.modules.quantity)
		const totalModules = ram.reduce((acc, r) => acc + (r.modules?.quantity || 1), 0)
		if (totalModules > mobo.ram_slots) {
			errors.push(`Too many RAM modules: ${totalModules} installed, but Mobo only has ${mobo.ram_slots} slots`)
		}
	}

	// 3. Storage: Cantidad de discos
	if (storage && storage.length > 0 && mobo) {
		const totalStorageSlots = (mobo.internal_connectors?.sata_6gb || 0) + (mobo.internal_connectors?.m2_nvme || 0)
		if (storage.length > totalStorageSlots) {
			errors.push("Not enough storage connectors on the Motherboard")
		}
	}

	// 4. Form Factor (Usando tu constante)
	if (pcCase && mobo) {
		const caseIndex = MOBO_FORM_FACTOR.indexOf(pcCase.form_factor)
		const moboIndex = MOBO_FORM_FACTOR.indexOf(mobo.form_factor)

		// Si la placa es "más grande" (índice mayor) que la caja, error
		if (moboIndex > caseIndex) {
			errors.push(`Case (${pcCase.form_factor}) is too small for Motherboard (${mobo.form_factor})`)
		}
	}

	// 5. PSU Wattage (Añadiendo el campo que faltaba)
	if (psu && cpu && gpu) {
		const estimatedConsumption = (cpu.tdp || 0) + (gpu.tdp || 0) + 50 // 50W extra para el resto
		if (psu.wattage < estimatedConsumption) {
			errors.push(`PSU wattage too low: Recommended at least ${estimatedConsumption}W`)
		}
	}

	return errors
}
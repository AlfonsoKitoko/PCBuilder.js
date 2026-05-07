import { MOBO_FORM_FACTOR } from "../constants/index.constant.js"

export const checkCompatibility = (build) => {
	const report = { errors: [], warnings: [] }

	if (!build) return report

	const { cpu, mobo, ram, gpu, storage, case: pcCase, psu } = build

	// 1. Socket CPU vs Motherboard
	if (cpu && mobo && cpu.socket !== mobo.socket) {
		report.errors.push(`Incompatible Socket: CPU is ${cpu.socket} but Motherboard is ${mobo.socket}`)
	}

	// 2. RAM: Tipo y Cantidad de Módulos
	if (ram && ram.length > 0 && mobo) {
		const wrongType = ram.some(r => r.ram_type !== mobo.ram_type)
		if (wrongType) {
			report.errors.push(`RAM type mismatch: Motherboard requires ${mobo.ram_type}`)
		}

		const totalModules = ram.reduce((acc, r) => acc + (r.modules?.quantity || 1), 0)
		if (totalModules > mobo.ram_slots) {
			report.errors.push(`Too many RAM modules: ${totalModules} installed, but Mobo only has ${mobo.ram_slots} slots`)
		}

		if (totalModules === 1) {
			report.warnings.push("Only one RAM module detected. For better performance, consider using dual-channel with 2 modules.")
		}
	}

	// 3. Storage: Cantidad de discos
	if (storage && storage.length > 0) {
		if (mobo) {
			// CORRECCIÓN: Acceso a rutas anidadas en el objeto Mobo
			const storageInfo = mobo.internal_connectors?.storage
			const sataSlots = storageInfo?.sata_6gb || 0
			const nvmeSlots = storageInfo?.m2_slots || 0

			const requiredSata = storage.filter(s => s.interface?.includes('SATA')).length
			const requiredNvme = storage.filter(s => s.nvme === true).length

			if (requiredSata > sataSlots) {
				report.errors.push(`Not enough SATA ports: Need ${requiredSata}, Mobo has ${sataSlots}`)
			}
			if (requiredNvme > nvmeSlots) {
				report.errors.push(`Not enough M.2 slots: Need ${requiredNvme}, Mobo has ${nvmeSlots}`)
			}
		}

		if (pcCase) {
			const bays35 = pcCase.internal_bays?.int35 || 0
			const bays25 = pcCase.internal_bays?.int25 || 0
			const required35 = storage.filter(s => s.form_factor === '3.5"').length
			const required25 = storage.filter(s => s.form_factor === '2.5"').length

			if (required35 > bays35) {
				report.errors.push(`Not enough 3.5" bays: Need ${required35}, Case has ${bays35}`)
			}

			const remainingAfter35 = bays35 - required35
			const availableFor25 = bays25 + (remainingAfter35 > 0 ? remainingAfter35 : 0)

			if (required25 > availableFor25) {
				report.errors.push(`Not enough physical space for 2.5" drives: Need ${required25}, Case only has ${availableFor25} spots left`)
			}
		}
	}

	// Validación Legacy Storage
	if (storage && storage.length > 0 && mobo) {
		const requiredIde = storage.filter(s => s.interface === 'IDE').length
		const availableIde = mobo.internal_connectors?.legacy?.ide || 0

		if (requiredIde > availableIde) {
			report.errors.push(`Legacy Error: Need ${requiredIde} IDE port(s), but Motherboard only has ${availableIde}`)
		}

		const requiredSata3 = storage.filter(s => s.interface === 'SATA 3GB/S').length
		const availableSata3 = mobo.internal_connectors?.legacy?.sata_3gb || 0
		const availableSata6 = mobo.internal_connectors?.storage?.sata_6gb || 0

		if (requiredSata3 > availableSata3) {
			if (requiredSata3 > (availableSata3 + availableSata6)) {
				report.errors.push(`SATA Error: Not enough ports for your SATA 3GB/s drives`)
			} else {
				report.warnings.push(`SATA Note: Your SATA 3GB/s drive will be connected to a SATA 6GB/s port`)
			}
		}
	}

	// 4. Form Factor
	if (pcCase && mobo) {
		const caseIndex = MOBO_FORM_FACTOR.indexOf(pcCase.form_factor)
		const moboIndex = MOBO_FORM_FACTOR.indexOf(mobo.form_factor)

		if (moboIndex > caseIndex) {
			report.errors.push(`Case (${pcCase.form_factor}) is too small for Motherboard (${mobo.form_factor})`)
		}
	}

	// 5. PSU Wattage (Cálculo básico para validación inmediata)
	if (psu && cpu && (gpu || cpu.hasIntegrated)) {
		const gpuConsumption = gpu ? (gpu.tdp || 0) : 0
		const baseConsumption = (cpu.tdp || 0) + gpuConsumption + 50
		if (psu.wattage < baseConsumption) {
			report.errors.push(`PSU wattage too low: Recommended at least ${baseConsumption}W`)
		}
	}

	// 6. Gráficos (CORREGIDO: Usamos la propiedad booleana correcta del modelo)
	const hasIGP = cpu?.hasIntegrated === true

	if (cpu && !hasIGP && !gpu) {
		report.errors.push("No video output: CPU has no integrated graphics and no GPU is selected.")
	} else if (cpu && hasIGP && !gpu) {
		report.warnings.push("Integrated graphics only: This build might struggle with gaming or heavy 3D tasks.")
	}

	// Validación de puertos físicos en la placa si se usa la integrada
	if (cpu && hasIGP && !gpu && mobo) {
		const video = mobo.rear_io?.video
		const totalPorts = (video?.vga || 0) + (video?.dvi || 0) + (video?.hdmi || 0) + (video?.displayport || 0)

		if (totalPorts === 0) {
			report.errors.push("No video output: CPU has integrated graphics but Motherboard has no video ports.")
		}
	}

	return report
}
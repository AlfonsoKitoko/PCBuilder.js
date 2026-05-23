import { MOBO_FORM_FACTOR } from "../constants/index.constant.js"
import { calcTotalPowerConsum } from "./power.engine.js"

export const checkCompatibility = (build) => {
	const report = { errors: [], warnings: [] }

	if (!build) return report

	const { cpu, mobo, ram, gpu, storage, case: pcCase, psu } = build

	// 1. Socket CPU vs Motherboard
	if (cpu && mobo && cpu.socket !== mobo.socket) {
		// report.errors.push(`Incompatible Socket: CPU is ${cpu.socket} but Motherboard is ${mobo.socket}`)
		report.errors.push(`Zócalo incompatible: la CPU es ${cpu.socket} pero la placa base es ${mobo.socket}`)
	}

	// 2. RAM: Tipo y Cantidad de Módulos
	if (ram && ram.length > 0 && mobo) {
		const wrongType = ram.some(r => r.ram_type !== mobo.ram_type)
		if (wrongType) {
			// report.errors.push(`RAM type mismatch: Motherboard requires ${mobo.ram_type}`)
			report.errors.push(`Tipo de RAM distinto: la placa base requiere ${mobo.ram_type}`)
		}

		const totalModules = ram.reduce((acc, kit) => {
			const sticksPerKit = kit.modules?.reduce((sum, m) => sum + (+m.quantity || 0), 0) || 0
			return acc + sticksPerKit
		}, 0)

		if (totalModules > mobo.ram_slots) {
			// report.errors.push(`Too many RAM modules: ${totalModules} installed, but Mobo only has ${mobo.ram_slots} slots`)
			report.errors.push(`Demasiados módulos de RAM: ${totalModules} instalados, pero la placa base solo tiene ${mobo.ram_slots} ranuras`)
		}

		if (totalModules === 1) {
			// report.warnings.push("Only one RAM module detected. For better performance, consider using dual-channel with 2 modules.")
			report.warnings.push("Un único módulo de RAM detectado. Para un mejor rendimiento, considera usar dual-channel con 2 módulos.")
		}
	}

	// 3. Storage: Cantidad de discos
	if (storage && storage.length > 0) {
		// A. Validación contra la Placa Base (Mobo)
		if (mobo) {
			const storageInfo = mobo.internal_connectors?.storage
			let sata30Slots = storageInfo?.sata_3gb || 0
			let sata60Slots = storageInfo?.sata_6gb || 0
			const totalSataSlots = sata30Slots + sata60Slots
			const nvmeSlots = storageInfo?.m2_slots || 0

			const requiredSata30 = storage.filter(s => s.interface?.includes('SATA 3.0 GB/S') || s.interface?.includes('SATA II')).length
			const requiredSata60 = storage.filter(s => s.interface?.includes('SATA 6.0 GB/S') || s.interface?.includes('SATA III') || (s.interface?.includes('SATA') && !s.interface?.includes('3.0') && !s.interface?.includes('II'))).length
			const totalRequiredSata = requiredSata30 + requiredSata60

			const requiredNvme = storage.filter(s => s.nvme === true).length

			// Verificación de límites físicos absolutos (Errores)
			if (totalRequiredSata > totalSataSlots) {
				// report.errors.push(`Not enough SATA ports: Need ${totalRequiredSata}, Mobo has ${totalSataSlots}`)
				report.errors.push(`Not hay suficientes puertos SATA: Need ${totalRequiredSata}, Mobo has ${totalSataSlots}`)
			}
			if (requiredNvme > nvmeSlots) {
				// report.errors.push(`Not enough M.2 slots: Need ${requiredNvme}, Mobo has ${nvmeSlots}`)
				report.errors.push(`Not hay suficientes ranuras M.2: se necesitan ${requiredNvme}, la placa base tiene ${nvmeSlots}`)
			}

			// Simulación de reparto de puertos en cascada para calcular Warnings
			if (totalRequiredSata <= totalSataSlots) {
				let degradedTo30 = 0
				let underutilizedPorts = 0

				// Distribuir discos de 6.0 Gbps (SATA III)
				let rem60Drives = requiredSata60
				const used60_on_60 = Math.min(rem60Drives, sata60Slots)
				rem60Drives -= used60_on_60
				sata60Slots -= used60_on_60

				const used60_on_30 = Math.min(rem60Drives, sata30Slots)
				rem60Drives -= used60_on_30
				sata30Slots -= used60_on_30
				degradedTo30 += used60_on_30

				// Distribuir discos de 3.0 Gbps (SATA II)
				let rem30Drives = requiredSata30
				const used30_on_30 = Math.min(rem30Drives, sata30Slots)
				rem30Drives -= used30_on_30
				sata30Slots -= used30_on_30

				const used30_on_60 = Math.min(rem30Drives, sata60Slots)
				rem30Drives -= used30_on_60
				sata60Slots -= used30_on_60
				if (used30_on_60 > 0) underutilizedPorts += used30_on_60

				// Alertas de rendimiento
				if (degradedTo30 > 0) {
					// report.warnings.push(`Performance degradation: ${degradedTo30} drive(s) specified as SATA 6.0 GB/S will run at SATA 3.0 GB/S speed due to motherboard limitations`)
					report.warnings.push(`Rendimiento degradado: las unidades ${degradedTo30} son SATA 6.0 GB/s irán a velocidad de SATA 3.0 GB/Sdebido a lmitaciones de la placa base`)
				}
				if (underutilizedPorts > 0) {
					// report.warnings.push(`Port underutilization: ${underutilizedPorts} older SATA 3.0 GB/S drive(s) will be connected to faster SATA 6.0 GB/S ports, wasting interface bandwidth`)
					report.warnings.push(`Desaprovechamiento de puertos: ${underutilizedPorts} las unidades SATA 3.0 GB/s serán conectadas a puertos SATA 6.0 GB/S, desperdiciando ancho de banda`)
				}
			}
		}

		// B. Validación contra la Caja (pcCase) -> Reintroducido en su sitio idóneo
		if (pcCase) {
			const bays35 = pcCase.internal_bays?.int35 || 0
			const bays25 = pcCase.internal_bays?.int25 || 0
			const required35 = storage.filter(s => s.form_factor === '3.5"').length
			const required25 = storage.filter(s => s.form_factor === '2.5"').length

			if (required35 > bays35) {
				// report.errors.push(`Not enough 3.5" bays: Need ${required35}, Case has ${bays35}`)
				report.errors.push(`No hay suficientes bahías de 3.5": Requiere ${required35}, la Torre tiene ${bays35}`)
			}

			const remainingAfter35 = bays35 - required35
			const availableFor25 = bays25 + (remainingAfter35 > 0 ? remainingAfter35 : 0)

			if (required25 > availableFor25) {
				// report.errors.push(`Not enough physical space for 2.5" drives: Need ${required25}, Case only has ${availableFor25} spots left`)
				report.errors.push(`No hay suficiente espacio físico para unidades de 2.5": Requiere ${required25}, la Torre solo tiene ${availableFor25} espacios disponibles`)
			}
		}
	}

	// Validación Legacy Storage
	if (storage && storage.length > 0 && mobo) {
		const requiredIde = storage.filter(s => s.interface === 'IDE').length
		const availableIde = mobo.internal_connectors?.legacy?.ide || 0

		if (requiredIde > availableIde) {
			//report.errors.push(`Legacy Error: Need ${requiredIde} IDE port(s), but Motherboard only has ${availableIde}`)
			report.errors.push(`Error legacy: Se necesitan ${requiredIde} puerto(s) IDE, pero la placa base solo tiene ${availableIde}`)
		}

		const requiredSata3 = storage.filter(s => s.interface === 'SATA 3GB/S').length
		const availableSata3 = mobo.internal_connectors?.legacy?.sata_3gb || 0
		const availableSata6 = mobo.internal_connectors?.storage?.sata_6gb || 0

		if (requiredSata3 > availableSata3) {
			if (requiredSata3 > (availableSata3 + availableSata6)) {
				// report.errors.push(`SATA Error: Not enough ports for your SATA 3GB/s drives`)
				report.errors.push(`Error SATA: No hay suficientes puertos para sus unidades SATA 3GB/s`)
			} else {
				// report.warnings.push(`SATA Note: Your SATA 3GB/s drive will be connected to a SATA 6GB/s port`)
				report.warnings.push(`Nota SATA: Su unidad SATA 3GB/s será conectada a un puerto SATA 6GB/s`)
			}
		}
	}

	// 4. Form Factor
	if (pcCase && mobo) {
		const caseIndex = MOBO_FORM_FACTOR.indexOf(pcCase.form_factor)
		const moboIndex = MOBO_FORM_FACTOR.indexOf(mobo.form_factor)

		if (moboIndex > caseIndex) {
			// report.errors.push(`Case (${pcCase.form_factor}) is too small for Motherboard (${mobo.form_factor})`)
			report.errors.push(`La caja (${pcCase.form_factor}) es demasiado pequeña para la placa base (${mobo.form_factor})`)
		}
	}

	// 5. PSU Wattage (Cálculo básico para validación inmediata)
	if (psu && cpu) {
		const powerAnalysis = calcTotalPowerConsum(build)
		const totalConsumption = powerAnalysis.total

		if (psu.wattage < totalConsumption) {
			// report.errors.push(`PSU wattage too low: Total consumption is ${totalConsumption} W, but PSU only provides ${psu.wattage} W`)
			report.errors.push(`La potencia de la fuente de alimentación es insuficiente: El consumo total es ${totalConsumption} W, pero la fuente de alimentación solo proporciona ${psu.wattage} W`)
		}
	}

	// 6. Gráficos
	const hasIGP = cpu?.hasIntegrated === true

	if (cpu && !hasIGP && !gpu) {
		// report.errors.push("No video output: CPU has no integrated graphics and no GPU is selected.")
		report.errors.push("No hay salida de video: La CPU no tiene gráficos integrados y no se ha seleccionado un GPU.")
	} else if (cpu && hasIGP && !gpu) {
		// report.warnings.push("Integrated graphics only: This build might struggle with gaming or heavy 3D tasks.")
		report.warnings.push("Solo gráfica integrada: Esta configuración podría tener problemas con juegos o tareas 3D pesadas.")
	}

	// Validación de puertos físicos en la placa si se usa la integrada
	if (cpu && hasIGP && !gpu && mobo) {
		const video = mobo.rear_io?.video
		const totalPorts = (video?.vga || 0) + (video?.dvi || 0) + (video?.hdmi || 0) + (video?.displayport || 0)

		if (totalPorts === 0) {
			// report.errors.push("No video output: CPU has integrated graphics but Motherboard has no video ports.")
			report.errors.push("No hay salida de video: La CPU tiene gráficos integrados pero la placa base no tiene puertos de video.")
		}
	}

	return report
}
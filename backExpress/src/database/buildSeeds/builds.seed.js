import 'dotenv/config'
import mongoose from 'mongoose'

// Importación de Modelos
import User from '../../models/user.model.js'
import Cpu from '../../models/cpu.model.js'
import Mobo from '../../models/mobo.model.js'
import Ram from '../../models/ram.model.js'
import Storage from '../../models/storage.model.js'
import Gpu from '../../models/gpu.model.js'
import Case from '../../models/case.model.js'
import Psu from '../../models/psu.model.js'
import Build from '../../models/build.model.js'

// Importación del Service
import { createBuild } from '../../modules/build/build.service.js'

// Helper de búsqueda por palabras clave
const findPartByKeywords = async (Model, keywords) => {
	if (!keywords) return null
	const words = keywords.split(' ').filter(w => w.trim() !== '')
	const regexStr = words.map(w => `(?=.*${w})`).join('')
	const regex = new RegExp(regexStr, 'i')

	let part = await Model.findOne({ model: regex })
	if (!part) part = await Model.findOne({ name: regex })

	return part
}

const seedBuilds = async () => {
	try {
		const uri = process.env.MONGODB_ATLAS
		if (!uri) throw new Error('MONGODB_ATLAS no definida en .env')

		await mongoose.connect(new URL(uri).href)
		console.log('++ Conectado para crear las 8 Builds Reales ++')

		await Build.deleteMany({})
		console.log('-- Colección Build vaciada --')

		const users = await User.find().sort({ createdAt: 1 })
		if (users.length === 0) throw new Error('No hay usuarios en la DB. Corre el seed de usuarios primero.')

		const blueprints = [
			{ // AMD / AMD
				name: "AMD TEAM RED",
				description: "Build 100% AMD con el rey del gaming 9800X3D",
				cpu: "9800X3D",
				mobo: "MAG B850 TOMAHAWK",
				ram: "VENGEANCE RGB 32GB DDR5",
				storage: ["990 PRO"],
				gpu: "9070 XT",
				case: "XR-B",
				psu: "MAG A850GL"
			},
			{ // AMD / NVIDIA
				name: "NVIDIA BEAST",
				description: "Rendimiento extremo con la nueva RTX 5090",
				cpu: "Ryzen 9 7950X",
				mobo: "X870E AORUS ELITE",
				ram: "TRIDENT Z5 NEO 32GB",
				storage: ["870 Evo", "9100 Pro"],
				gpu: "RTX 5090",
				case: "VISION COMPACT",
				psu: "HX1500i"
			},
			{ // AMD / INTEL
				name: "INTEL ARC BALANCE",
				description: "Combinación de CPU AMD con la nueva gráfica de Intel",
				cpu: "Ryzen 5 9600X",
				mobo: "B850M Pro-A",
				ram: "VENGEANCE 16GB DDR5",
				storage: ["SN850X"],
				gpu: "Arc B580",
				case: "Eclipse G370A",
				psu: "MAG A750GL"
			},
			{ // AMD / -
				name: "MINIMAL APU",
				description: "PC de entrada sin tarjeta gráfica dedicada. Usa iGP del Ryzen.",
				cpu: "Ryzen 5 7600X",
				mobo: "B650 PLUS WIFI",
				ram: "VENGEANCE 16GB DDR5",
				storage: ["870 Evo"],
				gpu: null,
				case: "XR-B",
				psu: "A750GL"
			},
			{ // INTEL / INTEL
				name: "CREATOR STATION",
				description: "Potencia bruta para edición con i7 e Intel Arc",
				cpu: "i7-14700K",
				mobo: "Z790 A MAX",
				ram: "TRIDENT Z5 RGB 128GB",
				storage: ["SN850X"],
				gpu: "Arc B580",
				case: "XT PRO ULTRA",
				psu: "HX1500i"
			},
			{ // INTEL / AMD
				name: "HYBRID ENTHUSIAST",
				description: "Procesador Intel i9 con gráfica tope de gama de AMD",
				cpu: "i9-14900K",
				mobo: "Z790 EAGLE AX",
				ram: "FURY Beast 32GB",
				storage: ["9100 Pro"],
				gpu: "9070 XT",
				case: "Y70 Touch",
				psu: "HX1500i"
			},
			{ // INTEL / NVIDIA
				name: "CLASSIC PREMIUM",
				description: "La combinación tradicional Intel + NVIDIA para 4K",
				cpu: "i9-13900K",
				mobo: "Z790 EAGLE AX ATX", // Nombre exacto en tu array mobos
				ram: "TRIDENT Z5 ROYAL",
				storage: ["9100 Pro"],
				gpu: "RTX 5090",
				case: "Y70 Touch Infinite", // Nombre exacto en tu array cases
				psu: "HX1500i"
			},
			{ // INTEL / - (no válida)
				name: "PURE VALUE INTEL",
				description: "Excelente base Intel. Test de error: CPU 'KF' requiere GPU obligatoria.",
				cpu: "i5-14600KF",
				mobo: "B760 GAMING X",
				ram: "XPOWER Storm RGB",
				storage: ["870 Evo"],
				gpu: null, // Esto debería disparar un Error en el engine de compatibilidad
				case: "Pop Air",
				psu: "MAG A750GL"
			}
		]

		for (let i = 0; i < blueprints.length; i++) {
			const bp = blueprints[i]
			const currentUser = users[i % users.length]

			// Búsqueda concurrente de componentes básicos
			const [cpu, mobo, ram, pCase, psu] = await Promise.all([
				findPartByKeywords(Cpu, bp.cpu),
				findPartByKeywords(Mobo, bp.mobo),
				findPartByKeywords(Ram, bp.ram),
				findPartByKeywords(Case, bp.case),
				findPartByKeywords(Psu, bp.psu)
			])

			const gpu = bp.gpu ? await findPartByKeywords(Gpu, bp.gpu) : null

			const storagePromises = bp.storage.map(st => findPartByKeywords(Storage, st))
			const storages = await Promise.all(storagePromises)
			const validStorages = storages.filter(s => s !== null)

			// Verificación de integridad
			if (!cpu || !mobo || !ram || validStorages.length === 0 || !pCase || !psu) {
				const missing = []
				if (!cpu) missing.push(`CPU[${bp.cpu}]`)
				if (!mobo) missing.push(`MOBO[${bp.mobo}]`)
				if (!ram) missing.push(`RAM[${bp.ram}]`)
				if (!pCase) missing.push(`CASE[${bp.case}]`)
				if (!psu) missing.push(`PSU[${bp.psu}]`)
				console.warn(`⚠️ Saltando "${bp.name}": Componentes no encontrados -> ${missing.join(' | ')}`)
				continue
			}

			const buildData = {
				name: bp.name,
				description: bp.description,
				cpu: cpu._id,
				mobo: mobo._id,
				ram: [ram._id],
				storage: validStorages.map(s => s._id),
				case: pCase._id,
				psu: psu._id,
				gpu: gpu ? gpu._id : undefined
			}

			try {
				const result = await createBuild(buildData, currentUser._id)
				console.log(`✅ Build "${bp.name}" creada con éxito.`)

				if (result.warnings?.length > 0) {
					result.warnings.forEach(w => console.log(`   🔸 WARNING: ${w}`))
				}
			} catch (err) {
				// --- BLOQUE DE ERRORES DETALLADOS ---
				console.error(`\n❌ ERROR DE COMPATIBILIDAD en "${bp.name}":`)

				if (err.errors && Array.isArray(err.errors)) {
					// Si el service devuelve un array de errores del engine
					err.errors.forEach((e, idx) => console.error(`   ${idx + 1}. ${e}`))
				} else if (err.message) {
					// Error genérico o de Mongoose
					console.error(`   👉 ${err.message}`)
				}
				console.log('-------------------------------------------')
			}
		}

		console.log('\n++ Proceso de seeding finalizado ++')

	} catch (error) {
		console.error('!! Error crítico !!', error.message)
	} finally {
		await mongoose.connection.close()
		process.exit(0)
	}
}

seedBuilds()
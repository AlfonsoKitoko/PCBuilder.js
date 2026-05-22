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
			},
			{ // AMD / NVIDIA - Equilibrado 1440p Económico
				name: "Gamer Base 1440p",
				description: "Una de las configuraciones más equilibradas para jugar con fluidez a 1440p. La combinación del Ryzen 5 y la RTX 3070 ofrece una excelente relación calidad-precio sin cuello de botella apreciable",
				cpu: "Ryzen 5 5500",
				mobo: "PRIME B550M-A WIFI II",
				ram: "Vengeance LPX 32 GB (2 x 16 GB) DDR4-3200",
				storage: ["Caviar Blue"],
				gpu: "GAMING OC GeForce RTX 3070",
				case: "H3 Flow",
				psu: "MAG A650BN"
			},
			{ // El meme de la placa base entusiasta con CPU de entrada
				name: "El Rey del Cuello de Botella",
				description: "Una build totalmente descompensada que junta una de las placas base AM4 más premium y caras del mercado con un procesador Ryzen 3 de gama de entrada. Ideal para testear validaciones extremas",
				cpu: "Ryzen 3 4100",
				mobo: "ROG Crosshair VIII Dark Hero",
				ram: "CT8G4DFS824A 8 GB (1 x 8 GB) DDR4-2400",
				storage: ["BarraCuda 1 TB"],
				gpu: "Radeon RX 5600 XT GAMING MX",
				case: "Meshify 3",
				psu: "Steel Legend SL-650G"
			},
			{ // Nostalgia Gamer de hace unos años
				name: "Classic Red Maverick",
				description: "Un viaje en el tiempo impulsado por el mítico FX-8350 de 8 núcleos de AMD y la legendaria GTX 1080 de Nvidia. Una build clásica que todavía aguanta el tipo en juegos competitivos ligeros",
				cpu: "FX-8350",
				mobo: "GA-78LMT-USB3",
				ram: "Ripjaws X 8 GB (2 x 4 GB) DDR3-1600",
				storage: ["A400 240 GB"],
				gpu: "GAMING GeForce GTX 1080",
				case: "X3 Mesh",
				psu: "MAG A550BN"
			},
			{ // El Frankenstein del almacenamiento
				name: "Diógenes Digital",
				description: "Configuración extremadamente extraña que monta un procesador Athlon antiguo junto a una cantidad ingente de almacenamiento (8 TB). Un servidor de archivos masivo metido a la fuerza en un cuerpo modesto",
				cpu: "Athlon II X4",
				mobo: "880GMH/USB3",
				ram: "KVR13N9S6/2 2 GB (1 x 2 GB) DDR3-1333",
				storage: ["BarraCuda Compute 8 TB"],
				gpu: "ARMOR OC Radeon RX 580",
				case: "NX200M",
				psu: "400 N1"
			},
			{ // Intel con gráfica Arc
				name: "Alchemist Retrofitter",
				description: "Setup de gama media-baja que combina un i5 desbloqueado de 7ª generación con una tarjeta gráfica dedicada Intel Arc, ideal para experimentar con los drivers y tecnologías de codificación de vídeo AV1 de Intel",
				cpu: "Core i5-7600K",
				mobo: "GA-H270N-WIFI",
				ram: "GAMING 16 GB (2 x 8 GB)",
				storage: ["NV3 1 TB"],
				gpu: "Intel Arc A380 Challenger",
				case: "DB330M",
				psu: "Smart RGB"
			},
			{ // Cuello de botella invertido (Mucha GPU, poca CPU)
				name: "GPU Desbocada",
				description: "Esta configuración sufre un cuello de botella masivo en la CPU: un humilde Core i3 de 6ª generación intentando seguirle el ritmo a una potente RX 6700 XT. Los hilos de procesamiento pedirán clemencia",
				cpu: "Core i3-6300",
				mobo: "H110M-C/CSM",
				ram: "Trident Z Neo 16 GB (2 x 8 GB)",
				storage: ["Constellation ES.3 4 TB"],
				gpu: "PULSE Radeon RX 6700 XT",
				case: "Air Cross",
				psu: "Smart"
			},
			{ // Build de oficina con alma gaming reciclada
				name: "Frankenstein de Oficina",
				description: "Un procesador Celeron de ultra-bajo coste destinado a tareas de oficina que milagrosamente ha sido emparejado con una GTX 1060 para intentar revivirlo como equipo gaming de bajísimo presupuesto",
				cpu: "Celeron G1610",
				mobo: "P8Q77-M/CSM",
				ram: "Ballistix Sport 8 GB (1 x 8 GB)",
				storage: ["S300 4 TB"],
				gpu: "SC GAMING GeForce GTX 1060",
				case: "Design Core 1000",
				psu: "Vero L5"
			},
			{ // Antigua bestia entusiasta de gama alta
				name: "Titan Legacy Estilo Aorus",
				description: "Lo que solía ser un PC entusiasta de ensueño hace unos años. El Core i7-8700 junto a la imponente RTX 2080 Ti sigue destrozando cualquier juego actual en 1080p y 1440p con configuraciones gráficas altas",
				cpu: "Core i7-8700",
				mobo: "Z370 AORUS Ultra Gaming",
				ram: "T-Create Expert 32 GB (2 x 16 GB)",
				storage: ["WD_BLACK 4 TB"],
				gpu: "GAMING OC GeForce RTX 2080 Ti",
				case: "Xtender Mirror",
				psu: "MAG A650GL"
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
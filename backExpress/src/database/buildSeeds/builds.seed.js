import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../../models/user.model.js'
import Build from '../../models/build.model.js'
import Cpu from '../../models/cpu.model.js'
import Gpu from '../../models/gpu.model.js'
import Mobo from '../../models/mobo.model.js'
import Ram from '../../models/ram.model.js'
import Storage from '../../models/storage.model.js'
import Case from '../../models/case.model.js'
import Psu from '../../models/psu.model.js'
import Os from '../../models/os.model.js'

const seedBuilds = async () => {
	try {
		const uri = process.env.MONGODB_ATLAS
		await mongoose.connect(new URL(uri).href)
		console.log('++ Conectado para crear las Builds ++')

		await Build.deleteMany({})
		console.log('-- Colección Build vaciada --')

		const users = await User.find().lean()
		const cpus = await Cpu.find().lean()
		const gpus = await Gpu.find().lean()
		const mobos = await Mobo.find().lean()
		const rams = await Ram.find().lean()
		const storages = await Storage.find().lean()
		const cases = await Case.find().lean()
		const psus = await Psu.find().lean()
		const oss = await Os.find().lean()

		if (users.length < 5 || cpus.length < 1) {
			throw new Error('Faltan datos en las otras colecciones. Ejecuta los otros seeds primero.')
		}

		const buildTemplates = [
			{ name: 'ULTRA GAMING 4K', desc: 'LO MEJOR PARA ENTUSIASTAS.' },
			{ name: 'EQUILIBRADO AM5', desc: 'CALIDAD PRECIO PARA 1440P.' },
			{ name: 'WORKSTATION PRO', desc: 'ENFOCADO A RENDERIZADO.' },
			{ name: 'MINI-ITX COMPACT', desc: 'POTENCIA EN MINIMO ESPACIO.' },
			{ name: 'BUDGET GAMING', desc: 'PARA JUGAR A TODO EN 1080P.' },
			{ name: 'OFIMATICA PREMIUM', desc: 'SILENCIOSO Y RAPIDO.' },
			{ name: 'STREAMER STARTER', desc: 'OPTIMIZADO PARA CODIFICACION.' },
			{ name: 'LEGACY TEST', desc: 'PRUEBA DE PIEZAS ANTIGUAS.' },
			{ name: 'AMD FULL BUILD', desc: 'ECOSISTEMA COMPLETO AMD.' },
			{ name: 'INTEL NVIDIA BEAST', desc: 'LA COMBINACION CLASICA.' }
		]

		const finalBuilds = buildTemplates.map((template, i) => {
			const owner = users[i % users.length]
			const selectedCpu = cpus[i % cpus.length]
			const selectedGpu = gpus[i % gpus.length]
			const selectedMobo = mobos[i % mobos.length]
			const selectedRam = rams[i % rams.length]
			const selectedStorage = storages[i % storages.length]
			const selectedCase = cases[i % cases.length]
			const selectedPsu = psus[i % psus.length]
			const selectedOs = oss[i % oss.length]

			// Cálculo de precio en céntimos
			const totalPrice =
				selectedCpu.price + selectedGpu.price + selectedMobo.price +
				(selectedRam.price * 2) + selectedStorage.price + selectedCase.price +
				selectedPsu.price + (selectedOs?.price || 0)

			return {
				name: template.name,
				description: template.desc,
				owner: owner._id,
				// Aplanamos la estructura para que coincida con tu Schema
				cpu: selectedCpu._id,
				mobo: selectedMobo._id,
				gpu: selectedGpu._id,
				case: selectedCase._id,
				psu: selectedPsu._id,
				os: selectedOs._id,
				// RAM y Storage DEBEN ser Arrays para pasar tu validador nonEmptyArray
				ram: [selectedRam._id, selectedRam._id], // Simulamos Dual Channel
				storage: [selectedStorage._id],
				totalPrice: Math.round(totalPrice)
			}
		})

		await Build.insertMany(finalBuilds)
		console.log('++ 10 Builds creadas y vinculadas con éxito ++')

		await mongoose.connection.close()
		process.exit(0)
	} catch (error) {
		console.error('!! Error en Build Seed !!', error)
		process.exit(1)
	}
}

seedBuilds()
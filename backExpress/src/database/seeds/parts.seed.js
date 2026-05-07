import 'dotenv/config'
import mongoose from 'mongoose'

// Importación de models
import Cpu from '../../models/cpu.model.js'
import Mobo from '../../models/mobo.model.js'
import Ram from '../../models/ram.model.js'
import Storage from '../../models/storage.model.js'
import Gpu from '../../models/gpu.model.js'
import Case from '../../models/case.model.js'
import Psu from '../../models/psu.model.js'
import Os from '../../models/os.model.js'

// Importación de los services
import * as partService from '../../modules/part/part.service.js'
import * as cpuService from '../../modules/cpu/cpu.service.js'
import * as moboService from '../../modules/mobo/mobo.service.js'
import * as ramService from '../../modules/ram/ram.service.js'
import * as storageService from '../../modules/storage/storage.service.js'
import * as gpuService from '../../modules/gpu/gpu.service.js'
import * as caseService from '../../modules/case/case.service.js'
import * as psuService from '../../modules/psu/psu.service.js'
import * as osService from '../../modules/os/os.service.js'

// Importación de los datos (Seeds individuales)
import { cpus } from './parts/cpu.seed.js'
import { mobos } from './parts/mobo.seed.js'
import { rams } from './parts/ram.seed.js'
import { storages } from './parts/storage.seed.js'
import { gpus } from './parts/gpu.seed.js'
import { cases } from './parts/case.seed.js'
import { psus } from './parts/psu.seed.js'
import { oss } from './parts/os.seed.js'

const seedHardware = async () => {
	try {
		const uri = process.env.MONGODB_ATLAS
		if (!uri) throw new Error('MONGODB_ATLAS no definida en .env')

		await mongoose.connect(new URL(uri).href)
		console.log('++ Conectado para el Seeding de Hardware ++')

		// 1. Limpieza previa de colecciones (Borrado físico)
		await Promise.all([
			Cpu.deleteMany({}),
			Mobo.deleteMany({}),
			Ram.deleteMany({}),
			Storage.deleteMany({}),
			Gpu.deleteMany({}),
			Case.deleteMany({}),
			Psu.deleteMany({}),
			Os.deleteMany({})
		])
		console.log('-- Colecciones de hardware vaciadas correctamente --')

		// 2. Obtener categorías base
		const partTypes = await partService.getAllParts()

		const getTypeId = (name) => {
			const type = partTypes.find(p => p.name.toUpperCase() === name.toUpperCase())
			if (!type) throw new Error(`Categoría base "${name}" no encontrada`)
			return type._id
		}

		// 3. Función auxiliar para inyectar ID y crear vía Service
		const createItems = async (data, typeName, createFn) => {
			const typeId = getTypeId(typeName)
			const promises = data.map(item => {
				const itemWithId = { ...item, partType: typeId }
				return createFn(itemWithId)
			})
			return Promise.all(promises)
		}

		// 4. Inserción mediante Services
		console.log('-- Iniciando creación de componentes --')

		await Promise.all([
			createItems(cpus, 'CPU', cpuService.createCpu),
			createItems(mobos, 'MOTHERBOARD', moboService.createMobo),
			createItems(rams, 'RAM', ramService.createRam),
			createItems(storages, 'STORAGE', storageService.createStorage),
			createItems(gpus, 'GPU', gpuService.createGpu),
			createItems(cases, 'CASE', caseService.createCase),
			createItems(psus, 'PSU', psuService.createPsu),
			createItems(oss, 'OS', osService.createOs)
		])

		console.log('++ Hardware sembrado exitosamente ++')

	} catch (error) {
		console.error('!! Error en el proceso de seeding !!', error.message)
	} finally {
		await mongoose.connection.close()
		console.log('++ Conexión cerrada ++')
		process.exit(0)
	}
}

seedHardware()

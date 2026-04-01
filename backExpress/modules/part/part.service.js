import Part from '../../models/part.model.js'

import Case from '../../models/case.model.js'
import Cpu from '../../models/cpu.model.js'
import Gpu from '../../models/gpu.model.js'
import Mobo from '../../models/mobo.model.js'
import Os from '../../models/os.model.js'
import Psu from '../../models/psu.model.js'
import Ram from '../../models/ram.model.js'
import Storage from '../../models/storage.model.js'

// C - Crear part
export const createPart = async (partData) => {
	const newPart = new Part(partData)
	return await newPart.save()
}

// R - Listar todas las parts
export const getAllParts = async () => {
	return await Part.find().lean()
}

// R - Listar part por id
export const getPartById = async (id) => {
	return await Part.findById(id).lean()
}

// U - Actualizar part por id
export const updatePart = async (id, partData) => {
	return await Part.findByIdAndUpdate(id, partData, {
		new: true, runValidators: true
	}).lean()
}

// D - Eliminar part por id
export const deletePart = async (id) => {
	const parts = [Case, Cpu, Gpu, Mobo, Os, Psu, Ram, Storage]

	const contador = await Promise.all(
		parts.map(model => model.countDocuments({ partType: id }))
	)

	const hasDependencies = contador.reduce((acc, count) => acc + count, 0)

	if (hasDependencies > 0) {
		throw new Error('No se puede eliminar la part porque tiene dependencias')
	}
	return await Part.findByIdAndDelete(id)
}
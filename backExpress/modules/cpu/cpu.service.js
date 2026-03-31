import Cpu from '../../models/cpu.model.js'

// C - Crear cpu
export const createCpu = async (cpuData) => {
	const newCpu = new Cpu(cpuData)
	return await newCpu.save()
}

// R - Listar todas las cpus
export const getAllCpus = async () => {
	return await Cpu.find().populate('partType', 'name -_id').lean()
}

// R - Listar cpu por id
export const getCpuById = async (id) => {
	return await Cpu.findById(id).populate('partType', 'name -_id').lean()
}

// U - Actualizar cpu por id
export const updateCpu = async (id, cpuData) => {
	return await Cpu.findByIdAndUpdate(id, cpuData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar cpu por id
export const deleteCpu = async (id) => {
	return await Cpu.findByIdAndDelete(id)
}
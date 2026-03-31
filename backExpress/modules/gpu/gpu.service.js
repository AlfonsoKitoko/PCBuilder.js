import Gpu from '../../models/gpu.model.js'

// C - Crear gpu
export const createGpu = async (gpuData) => {
	const newGpu = new Gpu(gpuData)
	return await newGpu.save()
}

// R - Listar todas las gpus
export const getAllGpus = async () => {
	return await Gpu.find().populate('partType', 'name -_id').lean()
}

// R - Listar gpu por id
export const getGpuById = async (id) => {
	return await Gpu.findById(id).populate('partType', 'name -_id').lean()
}

// U - Actualizar gpu por id
export const updateGpu = async (id, gpuData) => {
	return await Gpu.findByIdAndUpdate(id, gpuData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar gpu por id
export const deleteGpu = async (id) => {
	return await Gpu.findByIdAndDelete(id)
}
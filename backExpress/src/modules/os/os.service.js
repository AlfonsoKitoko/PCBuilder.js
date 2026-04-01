import Os from '../../models/os.model.js'

// C - Crear os
export const createOs = async (osData) => {
	const newOs = new Os(osData)
	return await newOs.save()
}

// R - Listar todas las oss
export const getAllOss = async () => {
	return await Os.find().populate('partType', 'name -_id').lean()
}

// R - Listar os por id
export const getOsById = async (id) => {
	return await Os.findById(id).populate('partType', 'name -_id').lean()
}

// U - Actualizar os por id
export const updateOs = async (id, osData) => {
	return await Os.findByIdAndUpdate(id, osData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar os por id
export const deleteOs = async (id) => {
	return await Os.findByIdAndUpdate(id, { active: false })
}
import Mobo from '../../models/mobo.model.js'

// C - Crear mobo
export const createMobo = async (moboData) => {
	const newMobo = new Mobo(moboData)
	return await newMobo.save()
}

// R - Listar todas las mobos
export const getAllMobos = async () => {
	return await Mobo.find().populate('partType', 'name -_id').lean()
}

// R - Listar mobo por id
export const getMoboById = async (id) => {
	return await Mobo.findById(id).populate('partType', 'name -_id').lean()
}

// U - Actualizar mobo por id
export const updateMobo = async (id, moboData) => {
	return await Mobo.findByIdAndUpdate(id, moboData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar mobo por id
export const deleteMobo = async (id) => {
	return await Mobo.findByIdAndUpdate(id, { active: false })
}
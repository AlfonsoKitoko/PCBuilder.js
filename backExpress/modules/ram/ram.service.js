import Ram from '../../models/ram.model.js'

// C - Crear ram
export const createRam = async (ramData) => {
	const newRam = new Ram(ramData)
	return await newRam.save()
}

// R - Listar todas las rams
export const getAllRams = async () => {
	return await Ram.find().lean()
}

// R - Listar ram por id
export const getRamById = async (id) => {
	return await Ram.findById(id).lean()
}

// U - Actualizar ram por id
export const updateRam = async (id, ramData) => {
	return await Ram.findByIdAndUpdate(id, ramData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar ram por id
export const deleteRam = async (id) => {
	return await Ram.findByIdAndDelete(id)
}
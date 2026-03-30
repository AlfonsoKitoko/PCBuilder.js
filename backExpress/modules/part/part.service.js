import Part from '../../models/part.model.js'

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
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar part por id
export const deletePart = async (id) => {
	return await Part.findByIdAndDelete(id)
}
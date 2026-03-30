import Psu from '../../models/psu.model.js'

// C - Crear psu
export const createPsu = async (psuData) => {
	const newPsu = new Psu(psuData)
	return await newPsu.save()
}

// R - Listar todas las psus
export const getAllPsus = async () => {
	return await Psu.find().lean()
}

// R - Listar psu por id
export const getPsuById = async (id) => {
	return await Psu.findById(id).lean()
}

// U - Actualizar psu por id
export const updatePsu = async (id, psuData) => {
	return await Psu.findByIdAndUpdate(id, psuData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar psu por id
export const deletePsu = async (id) => {
	return await Psu.findByIdAndDelete(id)
}
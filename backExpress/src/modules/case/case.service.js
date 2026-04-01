import Case from '../../models/case.model.js'

// C - Crear caja
export const createCase = async (caseData) => {
	const newCase = new Case(caseData)
	return await newCase.save()
}

// R - Listar todas las cajas
export const getAllCases = async () => {
	return await Case.find().populate('partType', 'name -_id').lean()
}

// R - Listar caja por id
export const getCaseById = async (id) => {
	return await Case.findById(id).populate('partType', 'name -_id').lean()
}

// U - Actualizar caja por id
export const updateCase = async (id, caseData) => {
	return await Case.findByIdAndUpdate(id, caseData, {
		new: true,
		runValidators: true
	}).lean()
}

// D - Eliminar caja por id
export const deleteCase = async (id) => {
	return await Case.findByIdAndUpdate(id, { active: false })
}
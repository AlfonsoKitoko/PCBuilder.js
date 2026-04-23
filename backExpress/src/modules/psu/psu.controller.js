import * as psuService from './psu.service.js' // Importamos el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Psus
export const findAllPsus = wrapAsync(async (req, res) => {
	const psus = await psuService.getAllPsus()
	return apiResponse.success(res, `${psus.length} Psus retrieved successfully`, psus)
})

// R - Buscar por ID
export const findPsuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundPsu = await psuService.getPsuById(id)

	if (!foundPsu) throw new AppError('Psu not found', 404)

	return apiResponse.success(res, 'Psu details retrieved', foundPsu)
})

// C - Crear Psu
export const createPsu = wrapAsync(async (req, res) => {
	const newPsu = await psuService.createPsu(req.body)

	return apiResponse.success(res, 'Psu created successfully', newPsu, 201)
})

// U - Actualizar Psu
export const updatePsuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedPsu = await psuService.updatePsu(id, req.body)

	if (!updatedPsu) throw new AppError('Psu not found', 404)

	return apiResponse.success(res, 'Psu updated successfully', updatedPsu)
})

// D - Eliminar Psu
export const deletePsuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedPsu = await psuService.deletePsu(id)

	if (!deletedPsu) throw new AppError('Psu not found', 404)

	return apiResponse.success(res, 'Psu deleted successfully', null)
})
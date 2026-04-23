import * as moboService from './mobo.service.js' // Importammobo el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Mobo
export const findAllMobos = wrapAsync(async (req, res) => {
	const mobos = await moboService.getAllMobos()
	return apiResponse.success(res, `${mobos.length} Mobos retrieved successfully`, mobos)
})

// R - Buscar por ID
export const findMoboById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundMobo = await moboService.getMoboById(id)

	if (!foundMobo) throw new AppError('Mobo not found', 404)

	return apiResponse.success(res, 'Mobo details retrieved', foundMobo)
})

// C - Crear Mobo
export const createMobo = wrapAsync(async (req, res) => {
	const newMobo = await moboService.createMobo(req.body)

	return apiResponse.success(res, 'Mobo created successfully', newMobo, 201)
})

// U - Actualizar Mobo
export const updateMoboById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedMobo = await moboService.updateMobo(id, req.body)

	if (!updatedMobo) throw new AppError('Mobo not found', 404)

	return apiResponse.success(res, 'Mobo updated successfully', updatedMobo)
})

// D - Eliminar Mobo
export const deleteMoboById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedMobo = await moboService.deleteMobo(id)

	if (!deletedMobo) throw new AppError('Mobo not found', 404)

	return apiResponse.success(res, 'Mobo deleted successfully', null)
})
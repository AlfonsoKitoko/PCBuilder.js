import * as ramService from './ram.service.js' // Importamos el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las RAMs
export const findAllRams = wrapAsync(async (req, res) => {
	const rams = await ramService.getAllRams()
	return apiResponse.success(res, rams, `${rams.length} RAMs retrieved successfully`)
})

// R - Buscar por ID
export const findRamById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundRam = await ramService.getRamById(id)

	if (!foundRam) throw new AppError('RAM not found', 404)

	return apiResponse.success(res, foundRam, 'RAM details retrieved')
})

// C - Crear RAM
export const createRam = wrapAsync(async (req, res) => {
	const newRam = await ramService.createRam(req.body)

	return apiResponse.success(res, newRam, 'RAM created successfully')
})

// U - Actualizar RAM
export const updateRamById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedRam = await ramService.updateRam(id, req.body)

	if (!updatedRam) throw new AppError('RAM not found', 404)

	return apiResponse.success(res, updatedRam, 'RAM updated successfully')
})

// D - Eliminar RAM
export const deleteRamById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedRam = await ramService.deleteRam(id)

	if (!deletedRam) throw new AppError('RAM not found', 404)

	return apiResponse.success(res, null, 'RAM deleted successfully')
})
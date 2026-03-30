import * as partService from './part.service.js' // Importamos el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Parts
export const findAllParts = wrapAsync(async (req, res) => {
	const parts = await partService.getAllParts()
	return apiResponse.success(res, parts, `${parts.length} Parts retrieved successfully`)
})

// R - Buscar por ID
export const findPartById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundPart = await partService.getPartById(id)

	if (!foundPart) throw new AppError('Part not found', 404)

	return apiResponse.success(res, foundPart, 'Part details retrieved')
})

// C - Crear Part
export const createPart = wrapAsync(async (req, res) => {
	const newPart = await partService.createPart(req.body)

	return apiResponse.success(res, newPart, 'Part created successfully')
})

// U - Actualizar Part
export const updatePartById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedPart = await partService.updatePart(id, req.body)

	if (!updatedPart) throw new AppError('Part not found', 404)

	return apiResponse.success(res, updatedPart, 'Part updated successfully')
})

// D - Eliminar Part
export const deletePartById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedPart = await partService.deletePart(id)

	if (!deletedPart) throw new AppError('Part not found', 404)

	return apiResponse.success(res, null, 'Part deleted successfully')
})
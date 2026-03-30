import * as caseService from './case.service.js' // Importamcase el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Cases
export const findAllCases = wrapAsync(async (req, res) => {
	const cases = await caseService.getAllCase()
	return apiResponse.success(res, cases, `${cases.length} Cases retrieved successfully`)
})

// R - Buscar por ID
export const findCaseById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundCase = await caseService.getCaseById(id)

	if (!foundCase) throw new AppError('Case not found', 404)

	return apiResponse.success(res, foundCase, 'Case details retrieved')
})

// C - Crear Case
export const createCase = wrapAsync(async (req, res) => {
	const newCase = await caseService.createCase(req.body)

	return apiResponse.success(res, newCase, 'Case created successfully')
})

// U - Actualizar Case
export const updateCaseById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedCase = await caseService.updateCase(id, req.body)

	if (!updatedCase) throw new AppError('Case not found', 404)

	return apiResponse.success(res, updatedCase, 'Case updated successfully')
})

// D - Eliminar Case
export const deleteCaseById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedCase = await caseService.deleteCase(id)

	if (!deletedCase) throw new AppError('Case not found', 404)

	return apiResponse.success(res, null, 'Case deleted successfully')
})
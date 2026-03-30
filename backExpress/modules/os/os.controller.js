import * as osService from './os.service.js' // Importamos el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Oss
export const findAllOss = wrapAsync(async (req, res) => {
	const oss = await osService.getAllOss()
	return apiResponse.success(res, oss, `${oss.length} Oss retrieved successfully`)
})

// R - Buscar por ID
export const findOsById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundOs = await osService.getOsById(id)

	if (!foundOs) throw new AppError('Os not found', 404)

	return apiResponse.success(res, foundOs, 'Os details retrieved')
})

// C - Crear Os
export const createOs = wrapAsync(async (req, res) => {
	const newOs = await osService.createOs(req.body)

	return apiResponse.success(res, newOs, 'Os created successfully')
})

// U - Actualizar Os
export const updateOsById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedOs = await osService.updateOs(id, req.body)

	if (!updatedOs) throw new AppError('Os not found', 404)

	return apiResponse.success(res, updatedOs, 'Os updated successfully')
})

// D - Eliminar Os
export const deleteOsById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedOs = await osService.deleteOs(id)

	if (!deletedOs) throw new AppError('Os not found', 404)

	return apiResponse.success(res, null, 'Os deleted successfully')
})
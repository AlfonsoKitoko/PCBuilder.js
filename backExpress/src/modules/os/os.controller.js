import * as osService from './os.service.js' // Importamos el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Oss
export const findAllOss = wrapAsync(async (req, res) => {
	const oss = await osService.getAllOss()
	return apiResponse.success(res, `${oss.length} Oss retrieved successfully`, oss)
})

// R - Buscar por ID
export const findOsById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundOs = await osService.getOsById(id)

	if (!foundOs) throw new AppError('Os not found', 404)

	return apiResponse.success(res, 'Os details retrieved', foundOs)
})

// C - Crear Os
export const createOs = wrapAsync(async (req, res) => {
	const newOs = await osService.createOs(req.body)

	return apiResponse.success(res, 'Os created successfully', newOs, 201)
})

// U - Actualizar Os
export const updateOsById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedOs = await osService.updateOs(id, req.body)

	if (!updatedOs) throw new AppError('Os not found', 404)

	return apiResponse.success(res, 'Os updated successfully', updatedOs)
})

// D - Eliminar Os
export const deleteOsById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedOs = await osService.deleteOs(id)

	if (!deletedOs) throw new AppError('Os not found', 404)

	return apiResponse.success(res, 'Os deleted successfully', null)
})
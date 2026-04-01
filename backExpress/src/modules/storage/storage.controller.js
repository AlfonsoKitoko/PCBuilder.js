import * as storageService from './storage.service.js' // Importamos el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Storages
export const findAllStorages = wrapAsync(async (req, res) => {
	const storages = await storageService.getAllStorages()
	return apiResponse.success(res, storages, `${storages.length} Storages retrieved successfully`)
})

// R - Buscar por ID
export const findStorageById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundStorage = await storageService.getStorageById(id)

	if (!foundStorage) throw new AppError('Storage not found', 404)

	return apiResponse.success(res, foundStorage, 'Storage details retrieved')
})

// C - Crear Storage
export const createStorage = wrapAsync(async (req, res) => {
	const newStorage = await storageService.createStorage(req.body)

	return apiResponse.success(res, newStorage, 'Storage created successfully', 201)
})

// U - Actualizar Storage
export const updateStorageById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedStorage = await storageService.updateStorage(id, req.body)

	if (!updatedStorage) throw new AppError('Storage not found', 404)

	return apiResponse.success(res, updatedStorage, 'Storage updated successfully')
})

// D - Eliminar Storage
export const deleteStorageById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedStorage = await storageService.deleteStorage(id)

	if (!deletedStorage) throw new AppError('Storage not found', 404)

	return apiResponse.success(res, null, 'Storage deleted successfully')
})
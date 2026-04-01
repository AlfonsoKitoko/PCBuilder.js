import * as gpuService from './gpu.service.js' // Importamgpu el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Gpus
export const findAllGpus = wrapAsync(async (req, res) => {
	const gpus = await gpuService.getAllGpus()
	return apiResponse.success(res, gpus, `${gpus.length} Gpus retrieved successfully`)
})

// R - Buscar por ID
export const findGpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundGpu = await gpuService.getGpuById(id)

	if (!foundGpu) throw new AppError('Gpu not found', 404)

	return apiResponse.success(res, foundGpu, 'Gpu details retrieved')
})

// C - Crear Gpu
export const createGpu = wrapAsync(async (req, res) => {
	const newGpu = await gpuService.createGpu(req.body)

	return apiResponse.success(res, newGpu, 'Gpu created successfully', 201)
})

// U - Actualizar Gpu
export const updateGpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedGpu = await gpuService.updateGpu(id, req.body)

	if (!updatedGpu) throw new AppError('Gpu not found', 404)

	return apiResponse.success(res, updatedGpu, 'Gpu updated successfully')
})

// D - Eliminar Gpu
export const deleteGpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedGpu = await gpuService.deleteGpu(id)

	if (!deletedGpu) throw new AppError('Gpu not found', 404)

	return apiResponse.success(res, null, 'Gpu deleted successfully')
})
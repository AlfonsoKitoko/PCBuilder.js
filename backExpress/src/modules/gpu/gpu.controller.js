import * as gpuService from './gpu.service.js' // Importamgpu el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Gpus
export const findAllGpus = wrapAsync(async (req, res) => {
	const gpus = await gpuService.getAllGpus()
	return apiResponse.success(res, `${gpus.length} Gpus retrieved successfully`, gpus)
})

// R - Buscar por ID
export const findGpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundGpu = await gpuService.getGpuById(id)

	if (!foundGpu) throw new AppError('Gpu not found', 404)

	return apiResponse.success(res, 'Gpu details retrieved', foundGpu)
})

// C - Crear Gpu
export const createGpu = wrapAsync(async (req, res) => {
	const newGpu = await gpuService.createGpu(req.body)

	return apiResponse.success(res, 'Gpu created successfully', newGpu, 201)
})

// U - Actualizar Gpu
export const updateGpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedGpu = await gpuService.updateGpu(id, req.body)

	if (!updatedGpu) throw new AppError('Gpu not found', 404)

	return apiResponse.success(res, 'Gpu updated successfully', updatedGpu)
})

// D - Eliminar Gpu
export const deleteGpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedGpu = await gpuService.deleteGpu(id)

	if (!deletedGpu) throw new AppError('Gpu not found', 404)

	return apiResponse.success(res, 'Gpu deleted successfully', null)
})
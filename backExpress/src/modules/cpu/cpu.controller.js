import * as cpuService from './cpu.service.js' // Importamcpu el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Cpus
export const findAllCpus = wrapAsync(async (req, res) => {
	const cpus = await cpuService.getAllCpus()
	return apiResponse.success(res, cpus, `${cpus.length} Cpus retrieved successfully`)
})

// R - Buscar por ID
export const findCpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundCpu = await cpuService.getCpuById(id)

	if (!foundCpu) throw new AppError('Cpu not found', 404)

	return apiResponse.success(res, foundCpu, 'Cpu details retrieved')
})

// C - Crear Cpu
export const createCpu = wrapAsync(async (req, res) => {
	const newCpu = await cpuService.createCpu(req.body)

	return apiResponse.success(res, newCpu, 'Cpu created successfully', 201)
})

// U - Actualizar Cpu
export const updateCpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedCpu = await cpuService.updateCpu(id, req.body)

	if (!updatedCpu) throw new AppError('Cpu not found', 404)

	return apiResponse.success(res, updatedCpu, 'Cpu updated successfully')
})

// D - Eliminar Cpu
export const deleteCpuById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedCpu = await cpuService.deleteCpu(id)

	if (!deletedCpu) throw new AppError('Cpu not found', 404)

	return apiResponse.success(res, null, 'Cpu deleted successfully')
})
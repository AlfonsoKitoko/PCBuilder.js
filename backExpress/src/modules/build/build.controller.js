import * as buildService from './build.service.js'
import { wrapAsync } from '../../utils/asyncHandler.js'
import * as apiResponse from '../../utils/apiResponse.js'

// C - Crear Build
export const createBuild = wrapAsync(async (req, res) => {
	const { build, warnings } = await buildService.createBuild(req.body, req.user.id)

	const message = warnings.length > 0
		? 'Build created with compatibility warnings'
		: 'Build created successfully'

	return apiResponse.success(res, message, { build, warnings }, 201)
})

// R - Listar todas las Builds
export const getAllBuilds = wrapAsync(async (req, res) => {
	const builds = await buildService.getAllBuilds()
	return apiResponse.success(res, `All Builds (${builds.length}) retrieved`, builds)
})

// R - Listar mis Builds
export const getMyBuilds = wrapAsync(async (req, res) => {
	const builds = await buildService.getBuildsByUser(req.user.id)
	const count = builds.length
	return apiResponse.success(res, count > 0 ? `Retrieved ${count} Builds for current user` : `You haven't created any builds yet`, builds)
})

export const getBuildsByOneUser = wrapAsync(async (req, res) => {
	const builds = await buildService.getBuildsByUser(req.params.userId)
	return apiResponse.success(res, `${builds.length} Builds retrieved for user ${req.params.userId}`, builds)
})

// R - Buscar por ID
export const getBuildById = wrapAsync(async (req, res) => {
	const build = await buildService.getBuildById(req.params.id)
	return apiResponse.success(res, 'Build retrieved', build)
})

// U - Actualizar Build (Maneja la respuesta con Warnings)
export const updateBuild = wrapAsync(async (req, res) => {
	const { build, warnings } = await buildService.updateBuild(
		req.params.id, req.user.id, req.user.profile, req.body
	)

	const message = warnings.length > 0
		? 'Build updated with compatibility warnings'
		: 'Build updated successfully'

	return apiResponse.success(res, message, { build, warnings })
})

export const validateBuild = wrapAsync(async (req, res) => {
	const analysis = await buildService.validateBuild(req.body)

	return apiResponse.success(
		res, analysis.isValid ? 'Build is compatible' : 'Incompatibilities detected',
		analysis
	)
})

// D - Eliminar Build
export const deleteBuild = wrapAsync(async (req, res) => {
	await buildService.deleteBuild(
		req.params.id, req.user.id, req.user.profile
	)
	return apiResponse.success(res, 'Build deleted successfully', null)
})
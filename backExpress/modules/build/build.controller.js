import * as buildService from './build.service.js'
import { wrapAsync } from '../../utils/asyncHandler.js'
import * as apiResponse from '../../utils/apiResponse.js'

// C - Crear Build
export const createBuild = wrapAsync(async (req, res) => {
	const { build, warnings } = await buildService.createBuild(req.body, req.user.id)

	const message = warnings.length > 0
		? 'Build created with compatibility warnings'
		: 'Build created successfully'

	return apiResponse.success(res, { build, warnings }, message, 201)
})

// R - Listar todas las Builds
export const getAllBuilds = wrapAsync(async (req, res) => {
	const builds = await buildService.getAllBuilds()
	return apiResponse.success(res, builds, `All Builds (${builds.length}) retrieved`)
})

// R - Listar mis Builds
export const getMyBuilds = wrapAsync(async (req, res) => {
	const builds = await buildService.getBuildsByUser(req.user.id)
	const count = builds.length
	return apiResponse.success(res, builds, count > 0 ? `Retrieved ${count} Builds for current user` : `You haven't created any builds yet`)
})

export const getBuildsByOneUser = wrapAsync(async (req, res) => {
	const builds = await buildService.getBuildsByUser(req.params.userId)
	return apiResponse.success(res, builds, `${builds.length} Builds retrieved for user ${req.params.userId}`)
})

// R - Buscar por ID
export const getBuildById = wrapAsync(async (req, res) => {
	const build = await buildService.getBuildById(req.params.id)
	return apiResponse.success(res, build, 'Build retrieved')
})

// U - Actualizar Build (Maneja la respuesta con Warnings)
export const updateBuild = wrapAsync(async (req, res) => {
	const { build, warnings } = await buildService.updateBuild(
		req.params.id, req.user.id, req.user.profile, req.body
	)

	const message = warnings.length > 0
		? 'Build updated with compatibility warnings'
		: 'Build updated successfully'

	return apiResponse.success(res, { build, warnings }, message)
})

// D - Eliminar Build
export const deleteBuild = wrapAsync(async (req, res) => {
	await buildService.deleteBuild(
		req.params.id, req.user.id, req.user.profile
	)
	return apiResponse.success(res, null, 'Build deleted successfully')
})
import * as buildService from './build.service.js'
import { wrapAsync } from '../../utils/asyncHandler.js'
import * as apiResponse from '../../utils/apiResponse.js'

export const createBuild = wrapAsync(async (req, res) => {
	const newBuild = await buildService.createBuild(req.body, req.user._id)
	return apiResponse.success(res, newBuild, 'Build created successfully')
})

export const getMyBuilds = wrapAsync(async (req, res) => {
	const builds = await buildService.getUserbuilds(req.user._id)
	return apiResponse.success(res, builds, `${builds.length} Builds retrieved`)
})

export const getBuildById = wrapAsync(async (req, res) => {
	const build = await buildService.getBuildById(req.params.id)
	return apiResponse.success(res, build, 'Build retrieved')
})

export const updateBuild = wrapAsync(async (req, res) => {
	const updatedBuild = await buildService.updateBuild(req.params.id, req.user._id, req.body)
	return apiResponse.success(res, updatedBuild, 'Build updated successfully')
})

export const deleteBuild = wrapAsync(async (req, res) => {
	await buildService.deleteBuild(req.params.id, req.user._id)
	return apiResponse.success(res, null, 'Build deleted successfully')
})
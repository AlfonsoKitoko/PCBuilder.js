import Build from '../../models/build.model.js'
import { validateFullBuild } from '../../build-engine/validation.engine.js'
import { calcTotalPrice } from '../../build-engine/price.engine.js'
import AppError from '../../utils/AppError.js'
import { calcTotalPowerConsum } from '../../build-engine/power.engine.js'

// C - Crear build
export const createBuild = async (buildData, userId) => {
	const newBuild = new Build({ ...buildData, owner: userId })
	// Poblamos para tener los datos técnicos necesarios para el Engine
	await newBuild.populate(['cpu', 'mobo', 'ram', 'gpu', 'psu', 'case', 'storage', 'os'])

	const validation = validateFullBuild(newBuild)
	// validation.errors es un array con los mensajes de error críticos
	if (!validation.isValid) throw new AppError('Build Incompatibility', 400, validation.errors)

	// Calculamos el precio usando el Engine de precios
	const powerAnalysis = calcTotalPowerConsum(newBuild)
	newBuild.totalPrice = calcTotalPrice(newBuild)
	newBuild.totalWattage = powerAnalysis.total

	await newBuild.save()
	await newBuild.populate('owner', 'username')

	return { build: newBuild, warnings: validation.warnings }
}

// R - Listar todas las builds
export const getAllBuilds = async () => {
	return await Build.find()
		.select('-__v -createdAt -updatedAt -description')
		.populate('owner', 'username')
		.populate('cpu gpu os case mobo storage', 'manufacturer model slug gpu_type +active')
		.populate('ram', 'manufacturer model capacity speed slug +active')
		.populate('psu', 'manufacturer model wattage slug +active')
		.sort({ updatedAt: -1, createdAt: -1 })
		.lean()
}

// R - Listar todas las builds de un usuario
export const getBuildsByUser = async (userId) => {
	return await Build.find({ owner: userId })
		.select('-__v -createdAt -updatedAt -description')
		.populate('owner', 'username')
		.populate('cpu gpu os case mobo storage', 'manufacturer model slug gpu_type +active')
		.populate('ram', 'manufacturer model capacity speed slug +active')
		.populate('psu', 'manufacturer model wattage slug +active')
		.sort({ updatedAt: -1, createdAt: -1 })
		.lean()
}

// R - Detalle build por id
export const getBuildById = async (id) => {
	const build = await Build.findById(id)
		.select('-__v')
		.populate('owner', 'username')
		.populate({
			path: 'cpu mobo ram storage gpu psu case os',
			select: '+active',
			populate: {
				path: 'partType',
				select: 'name slug'
			}
		})
		.lean()

	if (!build) throw new AppError('Build not found', 404)

	build.wattage = calcTotalPowerConsum(build)

	return build
}

// U - Actualizar build por id (sólo dueño o admin)
export const updateBuild = async (id, userId, userProfile, updateData) => {
	// Buscamos la instancia (sin .lean() para poder usar .save() después)
	const build = await Build.findById(id)
	if (!build) throw new AppError('Build not found', 404)

	const isOwner = build.owner?.toString() === userId?.toString()
	const isAdmin = userProfile === 'ADMIN'
	if (!isOwner && !isAdmin) throw new AppError('Unauthorized: you can only update your own builds', 403)

	delete updateData.owner // No permitimos cambiar el owner
	delete updateData._id // No permitimos cambiar el ID

	// Actualizamos campos
	Object.assign(build, updateData)

	// Re-validamos con los nuevos componentes
	await build.populate(['cpu', 'mobo', 'ram', 'storage', 'gpu', 'case', 'psu', 'os'])

	const validation = validateFullBuild(build)
	if (!validation.isValid) {
		throw new AppError('Update failed: Incompatibility detected', 400, validation.errors)
	}

	const powerAnalysis = calcTotalPowerConsum(build)
	build.totalPrice = calcTotalPrice(build)	// El precio se recalcula siempre
	build.totalWattage = powerAnalysis.total

	await build.save()

	await build.populate('owner', 'username')

	return { build: build, warnings: validation.warnings }
}

export const validateBuild = async (buildData) => {
	const tempBuild = new Build(buildData)
	await tempBuild.populate(['cpu', 'mobo', 'ram', 'storage', 'gpu', 'case', 'psu', 'os'])

	const validation = validateFullBuild(tempBuild)
	const powerDetails = calcTotalPowerConsum(tempBuild)
	const totalPrice = calcTotalPrice(tempBuild)

	return {
		isValid: validation.isValid,
		errors: validation.errors,
		warnings: validation.warnings,
		wattage: powerDetails,
		totalPrice
	}
}

// D - Eliminar build por id (sólo dueño o admin)
export const deleteBuild = async (id, userId, userProfile) => {
	// Usamos findOneAndDelete para asegurar que el owner es el correcto
	const build = await Build.findById(id)
	if (!build) throw new AppError('Build not found', 404)

	const isOwner = build.owner?.toString() === userId?.toString()
	const isAdmin = userProfile === 'ADMIN'
	if (!isOwner && !isAdmin) throw new AppError('Unauthorized: you can only delete your own builds', 403)

	await build.deleteOne()
	return build
}

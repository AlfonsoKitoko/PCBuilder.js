import Build from '../../models/build.model.js'
import { validateFullBuild } from '../../build-engine/validation.engine.js'
import { calcTotalPrice } from '../../build-engine/price.engine.js'
import AppError from '../../utils/AppError.js'

// C - Crear build
export const createBuild = async (buildData, userId) => {
	const newBuild = new Build({ ...buildData, owner: userId })
	// Poblamos para tener los datos técnicos necesarios para el Engine
	await newBuild.populate(['cpu', 'mobo', 'ram', 'gpu', 'psu', 'case', 'storage', 'os'])

	const validation = validateFullBuild(newBuild)
	// validation.errors es un array con los mensajes de error críticos
	if (!validation.isValid) throw new AppError('Build Incompatibility', 400, validation.errors)

	// Calculamos el precio usando el Engine de precios
	newBuild.totalPrice = calcTotalPrice(newBuild)
	const savedBuild = await newBuild.save()
	return { build: savedBuild, warnings: validation.warnings }
}

// R - Listar todas las builds
export const getAllBuilds = async () => {
	return await Build.find()
		.populate('owner', 'username')
		.sort({ createdAt: -1 })
		.lean()
}

// R - Listar todas las builds de un usuario
export const getBuildsByUser = async (userId) => {
	return await Build.find({ owner: userId })
		.populate('owner', 'username')
		.populate('cpu gpu os')
		.sort({ createdAt: -1 })
		.lean()
}

// R - Detalle build por id
export const getBuildById = async (id) => {
	const build = await Build.findById(id)
		.populate('cpu mobo ram storage gpu psu case os owner')
		.lean()

	if (!build) throw new AppError('Build not found', 404)
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

	build.totalPrice = calcTotalPrice(build)	// El precio se recalcula siempre
	const updatedBuild = await build.save()

	return { build: updatedBuild, warnings: validation.warnings }
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

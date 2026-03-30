import Build from '../../models/build.model.js'
import { validateFullBuild } from '../../build-engine/validation.engine.js'
import { calcTotalPrice } from '../../build-engine/price.engine.js'
import AppError from '../../utils/AppError.js'

// C - Crear build
export const createBuild = async (buildData, userId) => {
	// Instanciar modelo con los datos de la build y el ID del usuario propietario
	const newBuild = new Build({
		...buildData,
		owner: userId
	})

	// Populate con las partes para validar compatibilidad y calcular precio total
	await newBuild.populate([
		'cpu',
		'mobo',
		'ram',
		'gpu',
		'psu',
		'case',
		'storage',
		'os'
	])
	// Ejecuta validation Engine
	const validation = validateFullBuild(newBuild)

	if (!validation.isValid) {
		// Muestra errores de compatibilidad
		throw new AppError('Build Incompatibility', 400, validation.errors)
	}

	// Cálculo del precio total
	newBuild.totalPrice = calcTotalPrice(newBuild)

	// Guarda la build en la base de datos
	return await newBuild.save()
}

// R - Listar todas las builds
export const getAllBuilds = async () => {
	return await Build.find().lean()
}

// R - Listar todas las builds de un usuario

export const getUserbuilds = async (userId) => {
	return await Build.find({ owner: userId })
		.populate('cpu gpu os')
		.sort({ createdAt: -1 })
		.lean()
}


// R - Listar build por id
export const getBuildById = async (id) => {
	const build = await Build.findById(id)
		.populate('cpu mobo ram gpu psu case storage os')
		.lean()

	if (!build) throw new AppError('Build not found', 404)
	return build
}

// U - Actualizar build por id
export const updateBuild = async (id, userId, updateData) => {
	const build = awaitBuild.findOne({ _id: id, owner: userId })
	if (!build) throw new AppError('Build not found or unauthorized', 404)
	Object.assign(build, updateData)
	await build.populate([
		'cpu',
		'mobo',
		'ram',
		'gpu',
		'psu',
		'case',
		'storage',
		'os'
	])

	const validation = validateFullBuild(build)

	if (!validation.isValid) {
		throw new AppError('Update failed: Incompatibility detected', 400, validation.errors)
	}

	build.totalPrice = calcTotalPrice(build)

	return await build.save()
}

// D - Eliminar build por id
export const deleteBuild = async (id, userId) => {
	const build = await Build.findByIdAndDelete({ _id: id, owner: userId })
	if (!build) throw new AppError('Build not found or unauthorized', 404)
	return build
}

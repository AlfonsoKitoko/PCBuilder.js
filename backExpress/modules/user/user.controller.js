import * as userService from './user.service.js' // Importamos el SERVICIO
import { wrapAsync } from '../../utils/asyncHandler.js' // Cambiado wrapAsync por tu utilidad
import * as apiResponse from '../../utils/apiResponse.js'
import AppError from '../../utils/AppError.js'

// R - Listar todas las Users
export const findAllUsers = wrapAsync(async (req, res) => {
	const users = await userService.getAllUsers()
	return apiResponse.success(res, users, `${users.length} Users retrieved successfully`)
})

// R - Buscar por ID
export const findUserById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const foundUser = await userService.getUserById(id)

	if (!foundUser) throw new AppError('User not found', 404)

	return apiResponse.success(res, foundUser, 'User details retrieved')
})

// C - Crear User
export const createUser = wrapAsync(async (req, res) => {
	const newUser = await userService.createUser(req.body)

	return apiResponse.success(res, newUser, 'User created successfully', 201)
})

// U - Actualizar mismo user
export const updateMe = wrapAsync(async (req, res) => {
	const { profile, ...safeData } = req.body

	const updatedUser = await userService.updateUser(
		req.user.id, req.user.id, req.user.profile, safeData
	)
	return apiResponse.success(res, updatedUser, 'Your profile has been updated')
})

// U - Actualizar User
export const updateUserById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const updatedUser = await userService.updateUser(
		id, req.user.id, req.user.profile, req.body
	)

	if (!updatedUser) throw new AppError('User not found', 404)

	return apiResponse.success(res, updatedUser, 'User updated successfully')
})

// D - Eliminar User
export const deleteUserById = wrapAsync(async (req, res) => {
	const { id } = req.params
	const deletedUser = await userService.deleteUser(id)

	if (!deletedUser) throw new AppError('User not found', 404)

	return apiResponse.success(res, null, 'User deleted successfully')
})
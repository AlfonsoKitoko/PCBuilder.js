import User from '../../models/user.model.js'
import AppError from '../../utils/AppError.js'
import { hashPassword, comparePassword } from '../../utils/bcrypt.js'

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// C - Crear user
export const createUser = async (userData) => {
	if (userData.password && !PASS_REGEX.test(userData.password)) {
		throw new AppError('La contraseña debe tener...', 400)
	}

	const hashedPassword = await hashPassword(userData.password)

	const newUser = new User({
		...userData,
		password: hashedPassword
	})

	const savedUser = await newUser.save()
	const userObj = savedUser.toObject()
	delete userObj.password
	return userObj
}

// R - Listar todas las users
export const getAllUsers = async () => {
	return await User.find().lean()
}

// R - Listar user por id
export const getUserById = async (id) => {
	return await User.findById(id).lean()
}

// U - Actualizar user por id
export const updateUser = async (id, userId, userProfile, userData) => {
	const isSelf = id.toString() === userId.toString()
	const isAdmin = userProfile === 'ADMIN'

	if (!isSelf && !isAdmin) throw new AppError('Unauthorized: only owner can update itself', 403)

	if (!isAdmin) delete userData.profile // No permitir cambiar el perfil si no es admin

	const updates = { ...userData }

	if (updates.password) {
		if (!PASS_REGEX.test(updates.password)) {
			throw new AppError('La nueva contraseña no cumple los requisitos de seguridad', 400)
		}
		updates.password = await hashPassword(updates.password)
	}

	const updatedUser = await User.findByIdAndUpdate(id, updates, {
		new: true,
		runValidators: true
	}).lean()

	if (!updatedUser) throw new AppError('Usuario no encontrado', 404)

	delete updatedUser.password
	return updatedUser
}

// D - Eliminar user por id
export const deleteUser = async (id) => {
	return await User.findByIdAndDelete(id)
}